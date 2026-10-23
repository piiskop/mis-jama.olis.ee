#!/usr/bin/env python3
"""Fetch complete new snapshots; never replace or delete an existing day."""
import argparse
import datetime
import fcntl
import hashlib
import json
import os
from pathlib import Path
import re
import tempfile
import urllib.request

ORIGIN = 'https://raw.githubusercontent.com/piiskop/mis-jama.olis.ee/main/public/'
DATE = re.compile(r'\d{4}-\d{2}-\d{2}')
NAME = re.compile(r'[A-Za-z0-9][A-Za-z0-9_.-]{0,80}')


def fetch(origin, path, limit):
    request = urllib.request.Request(origin.rstrip('/') + '/' + path,
                                     headers={'User-Agent': 'mis-jama-archive/1'})
    with urllib.request.urlopen(request, timeout=30) as response:
        body = response.read(limit + 1)
    if len(body) > limit:
        raise ValueError('Liiga suur fail: ' + path)
    return body


def checked(body, spec):
    if len(body) != spec['bytes'] or hashlib.sha256(body).hexdigest() != spec['sha256']:
        raise ValueError('Faili pikkus või SHA-256 ei klapi')
    return body


def validate_spec(spec):
    if not isinstance(spec, dict) or type(spec.get('bytes')) is not int:
        raise ValueError('Vigane failikirjeldus')
    if not 0 < spec['bytes'] <= 2_000_000 or not re.fullmatch(r'[a-f0-9]{64}', spec.get('sha256', '')):
        raise ValueError('Vigane suurus või SHA-256')


def update(root, origin):
    if root.is_symlink() or not root.is_dir():
        raise ValueError('Veebijuur peab olema olemasolev tavaline kataloog')
    if (root / 'index.html').is_symlink():
        raise ValueError('Avalehte ei tohi suunata sümbollingiga')
    manifest = json.loads(fetch(origin, 'manifest.json', 2_000_000))
    if manifest.get('version') != 1 or not isinstance(manifest.get('days'), list):
        raise ValueError('Tundmatu manifest')
    if not 1 <= len(manifest['days']) <= 10000:
        raise ValueError('Vigane päevade arv')
    validate_spec(manifest['index'])
    days = {}
    for day in manifest['days']:
        key = day['date']
        if not DATE.fullmatch(key) or datetime.date.fromisoformat(key).isoformat() != key or key in days:
            raise ValueError('Vigane või korduv kuupäev')
        files = day['files']
        if not isinstance(files, dict) or not 1 <= len(files) <= 20 or 'index.html' not in files:
            raise ValueError('Vigane päevafailide loend')
        for name, spec in files.items():
            if not NAME.fullmatch(name):
                raise ValueError('Vigane failinimi')
            validate_spec(spec)
        if sum(spec['bytes'] for spec in files.values()) > 10_000_000:
            raise ValueError('Liiga suur päev')
        days[key] = files
    for child in root.iterdir():
        if DATE.fullmatch(child.name) and child.name not in days:
            raise ValueError('Olemasolev päev puudub manifestist: ' + child.name)

    # Check ALL old days before installing any new files or changing the index.
    for key, files in days.items():
        target = root / key
        if target.exists() or target.is_symlink():
            if target.is_symlink() or not target.is_dir():
                raise ValueError('Päev ei ole tavaline kataloog: ' + key)
            if {p.name for p in target.iterdir()} != set(files):
                raise ValueError('Olemasoleva päeva faililoend erineb: ' + key)
            for name, spec in files.items():
                path = target / name
                if path.is_symlink() or not path.is_file():
                    raise ValueError('Vigane olemasolev päevafail')
                checked(path.read_bytes(), spec)

    # Fetch and verify everything before committing any new snapshots.
    with tempfile.TemporaryDirectory(prefix='.mis-jama-', dir=root) as staging:
        stage = Path(staging)
        fresh = []
        for key, files in sorted(days.items()):
            if (root / key).exists():
                continue
            directory = stage / key
            directory.mkdir(mode=0o755)
            for name, spec in files.items():
                path = directory / name
                path.write_bytes(checked(fetch(origin, key + '/' + name, spec['bytes']), spec))
                path.chmod(0o644)
            fresh.append(key)
        index = checked(fetch(origin, 'index.html', manifest['index']['bytes']), manifest['index'])
        for key in fresh:
            if (root / key).exists() or (root / key).is_symlink():
                raise ValueError('Päev tekkis uuendamise ajal; katkestan')
            os.rename(stage / key, root / key)
        current = root / 'index.html'
        if current.is_symlink():
            raise ValueError('Avalehte ei tohi suunata sümbollingiga')
        if not current.exists() or current.read_bytes() != index:
            replacement = stage / 'index.html'
            replacement.write_bytes(index)
            replacement.chmod(0o644)
            os.replace(replacement, current)
    print('Kontrollitud päevi:', len(days), '| Lisatud:', ', '.join(fresh) or '0')


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--root', type=Path, default=Path('/var/www/mis-jama.olis.ee'))
    parser.add_argument('--state-dir', type=Path, default=Path('/var/lib/mis-jama'))
    parser.add_argument('--origin', default=ORIGIN)
    args = parser.parse_args()
    args.state_dir.mkdir(parents=True, exist_ok=True)
    with (args.state_dir / 'update.lock').open('a') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX | fcntl.LOCK_NB)
        update(args.root, args.origin)


if __name__ == '__main__':
    main()
