#!/usr/bin/env python3
"""One authorized visual correction: put existing screenshots in the WBO story."""
import argparse
import datetime
import fcntl
import hashlib
import json
import os
from pathlib import Path
import shutil
import tempfile

DAY = '2026-10-23'
OLD = {
    'app.js': '78ac739130cf93c438ce519b12e69702157c17e392bd125d375388b5945cc893',
    'style.css': '777c6fc99d1900073f4287576d458db3ed3fb0a88724bc6daf16ef9143eabf65',
}


def digest(data):
    return hashlib.sha256(data).hexdigest()


def install(root, state, backups):
    source = Path(__file__).resolve().parents[1] / 'public'
    manifest = json.loads((source / 'manifest.json').read_text())
    files = next(day['files'] for day in manifest['days'] if day['date'] == DAY)
    target = root / DAY
    if root.is_symlink() or target.is_symlink() or not target.is_dir():
        raise ValueError('Veebijuurt või päeva kataloogi ei leitud')
    if {p.name for p in target.iterdir()} != set(files):
        raise ValueError('Päeva faililoend erineb; ei muuda midagi')
    with (state / 'update.lock').open('r+') as lock:
        fcntl.flock(lock, fcntl.LOCK_EX)
        replacements = {}
        originals = {}
        for name, spec in files.items():
            path = target / name
            if path.is_symlink() or not path.is_file():
                raise ValueError('Ootamatu päevafail: ' + name)
            current = path.read_bytes()
            new = (source / DAY / name).read_bytes()
            if len(new) != spec['bytes'] or digest(new) != spec['sha256']:
                raise ValueError('Lähtefail ei klapi manifestiga: ' + name)
            if current == new:
                continue
            if name not in OLD or digest(current) != OLD[name]:
                raise ValueError('Olemasolevat faili on muudetud; ei kirjuta üle: ' + name)
            replacements[name] = new
            originals[name] = current
        if not replacements:
            print('Loo sisupildid on juba paigaldatud.')
            return
        backup = backups / datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')
        backup.mkdir(parents=True, mode=0o700)
        for name, data in originals.items():
            (backup / name).write_bytes(data)
        with tempfile.TemporaryDirectory(prefix='.story-images-', dir=root) as temp:
            stage = Path(temp)
            for name, data in replacements.items():
                (stage / name).write_bytes(data)
                (stage / name).chmod(0o644)
            try:
                for name in replacements:
                    os.replace(stage / name, target / name)
            except BaseException:
                for name in originals:
                    shutil.copyfile(backup / name, target / name)
                raise
        print('Whitebophiri loo kolm sisupilti on paigaldatud.')
        print('Varukoopia:', backup)


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root', type=Path, default=Path('/var/www/mis-jama.olis.ee'))
    parser.add_argument('--state-dir', type=Path, default=Path('/var/lib/mis-jama'))
    parser.add_argument('--backup-root', type=Path, default=Path('/var/backups/mis-jama-story-images'))
    args = parser.parse_args()
    install(args.root, args.state_dir, args.backup_root)
