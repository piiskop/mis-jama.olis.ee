#!/usr/bin/env python3
"""Rebuild integrity metadata after adding a complete new public day."""
import datetime
import hashlib
import json
from pathlib import Path
import re

root = Path(__file__).resolve().parent / 'public'


def spec(path):
    body = path.read_bytes()
    return {'bytes': len(body), 'sha256': hashlib.sha256(body).hexdigest()}


days = []
for folder in sorted(root.iterdir()):
    if folder.is_dir() and re.fullmatch(r'\d{4}-\d{2}-\d{2}', folder.name):
        datetime.date.fromisoformat(folder.name)
        days.append({'date': folder.name, 'files': {p.name: spec(p) for p in sorted(folder.iterdir()) if p.is_file()}})
manifest = {'version': 1, 'index': spec(root / 'index.html'), 'days': days}
(root / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
print('Manifest:', len(days), 'päeva')
