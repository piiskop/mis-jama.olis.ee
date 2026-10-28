#!/usr/bin/env python3
"""Install the explicitly requested 28 October story clarifications with backup."""
import argparse
import datetime
import fcntl
import hashlib
import json
import os
from pathlib import Path
import tempfile

def digest(data):
    return hashlib.sha256(data).hexdigest()

def install(root, state, source):
    if root.is_symlink() or not root.is_dir():
        raise ValueError('Veebijuur ei ole tavaline kataloog')
    specs = json.loads((source / 'server/story-revisions.json').read_text())
    manifest = json.loads((source / 'public/manifest.json').read_text())
    manifest_files = {d['date']+'/'+n:s for d in manifest['days'] for n,s in d['files'].items()}
    pending = {}
    originals = {}
    for rel, hashes in specs.items():
        parts = Path(rel).parts
        if len(parts) != 2 or parts[1] not in ('app.js','index.html') or '..' in parts:
            raise ValueError('Vigane paranduse failinimi')
        target = root / rel
        replacement = (source / 'public' / rel).read_bytes()
        expected = manifest_files[rel]
        if digest(replacement) != hashes['after'] or digest(replacement) != expected['sha256'] or len(replacement) != expected['bytes']:
            raise ValueError('Paranduse kontrollsumma ei klapi: '+rel)
        if not target.parent.exists():
            continue  # The regular updater installs a complete missing day.
        if target.parent.is_symlink() or target.is_symlink() or not target.is_file():
            raise ValueError('Vigane olemasolev fail: '+rel)
        current = target.read_bytes()
        actual = digest(current)
        if actual == hashes['after']:
            continue
        if actual != hashes['before']:
            raise ValueError('Ootamatu kohalik muudatus; midagi ei paigaldatud: '+rel)
        pending[rel] = replacement
        originals[rel] = current
    if not pending:
        print('Kõik olemasolevate päevade täpsustused on juba paigaldatud.')
        return
    stamp = datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S.%fZ')
    backup = state / 'story-details-backups' / stamp
    for rel, data in originals.items():
        copy = backup / rel
        copy.parent.mkdir(parents=True, exist_ok=True)
        copy.write_bytes(data)
    changed = []
    with tempfile.TemporaryDirectory(prefix='.story-details-', dir=root) as temp:
        stage = Path(temp)
        try:
            for i,(rel,data) in enumerate(pending.items()):
                if (root/rel).read_bytes() != originals[rel]:
                    raise ValueError('Fail muutus paigaldamise ajal: '+rel)
                ready = stage / str(i)
                ready.write_bytes(data)
                ready.chmod(0o644)
                os.replace(ready, root/rel)
                changed.append(rel)
            for rel,data in pending.items():
                if (root/rel).read_bytes() != data:
                    raise ValueError('Järelkontroll ebaõnnestus: '+rel)
        except BaseException:
            for i,rel in enumerate(reversed(changed)):
                recovery = stage / ('restore-'+str(i))
                recovery.write_bytes(originals[rel])
                recovery.chmod(0o644)
                os.replace(recovery, root/rel)
            raise
    print('Paigaldatud '+str(len(pending))+' päevafaili. Varukoopia: '+str(backup))

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--root',type=Path,default=Path('/var/www/mis-jama.olis.ee'))
    parser.add_argument('--state-dir',type=Path,default=Path('/var/lib/mis-jama'))
    args=parser.parse_args()
    args.state_dir.mkdir(parents=True,exist_ok=True)
    with (args.state_dir/'update.lock').open('a') as lock:
        fcntl.flock(lock,fcntl.LOCK_EX)
        install(args.root,args.state_dir,Path(__file__).resolve().parents[1])

if __name__=='__main__':
    main()
