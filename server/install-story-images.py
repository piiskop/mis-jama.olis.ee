#!/usr/bin/env python3
"""Install authorized story images after validating existing days."""
import argparse, datetime, fcntl, hashlib, json, os, shutil, tempfile
from pathlib import Path
OLD = {
 '2026-10-22': {'app.js': {'fb978e2574e83121ba63e994aada572c3323494e568534ba65b41798a9b0c130'},'style.css': {'777c6fc99d1900073f4287576d458db3ed3fb0a88724bc6daf16ef9143eabf65'}},
 '2026-10-23': {'app.js': {'78ac739130cf93c438ce519b12e69702157c17e392bd125d375388b5945cc893','7177b0caf0fbe3fa80bc2b4825d54197409a4955d81ca6dad922898abd4faf4d'},'style.css': {'777c6fc99d1900073f4287576d458db3ed3fb0a88724bc6daf16ef9143eabf65','9d43b9ff7fe589f032b5114aac00f20d61705db61e68b470770e63e43468418f'}}}
OLD['2026-10-24'] = {'app.js': {'2c642caf32f10b2c1e2cdcb93a717fa67286400c5f37c08fe4773a18ffdd9673'}}
def digest(data): return hashlib.sha256(data).hexdigest()
def install(root,state,backups):
 source=Path(__file__).resolve().parents[1]/'public'
 manifest=json.loads((source/'manifest.json').read_text())
 if root.is_symlink() or not root.is_dir(): raise ValueError('Vigane veebijuur')
 with (state/'update.lock').open('r+') as lock:
  fcntl.flock(lock,fcntl.LOCK_EX); replacements={}; originals={}
  for day,allowed in OLD.items():
   files=next(d['files'] for d in manifest['days'] if d['date']==day); target=root/day
   if target.is_symlink() or not target.is_dir() or {p.name for p in target.iterdir()}!=set(files): raise ValueError('Päeva faililoend erineb: '+day)
   for name,spec in files.items():
    path=target/name;new=(source/day/name).read_bytes()
    if path.is_symlink() or not path.is_file(): raise ValueError('Vigane fail: '+str(path))
    if len(new)!=spec['bytes'] or digest(new)!=spec['sha256']: raise ValueError('Lähtefaili räsi erineb: '+day+'/'+name)
    current=path.read_bytes()
    if current==new: continue
    if digest(current) not in allowed.get(name,set()): raise ValueError('Ootamatu kohalik muudatus: '+day+'/'+name)
    key=Path(day)/name;replacements[key]=new;originals[key]=current
  # The image gallery lives in the archive index. Install it in the same
  # locked operation as the readers; do not rely on a later timer run.
  index=root/'index.html'; new_index=(source/'index.html').read_bytes()
  if index.is_symlink() or not index.is_file(): raise ValueError('Vigane arhiivi avaleht')
  if len(new_index)!=manifest['index']['bytes'] or digest(new_index)!=manifest['index']['sha256']: raise ValueError('Avalehte ei saa kontrollida')
  current_index=index.read_bytes()
  if current_index!=new_index:
   replacements[Path('index.html')]=new_index;originals[Path('index.html')]=current_index
  if not replacements:
   print('Lugude sisupildid on juba paigaldatud.');return
  backup=backups/datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ');backup.mkdir(parents=True,mode=0o700)
  for key,data in originals.items():
   (backup/key).parent.mkdir(exist_ok=True);(backup/key).write_bytes(data)
  with tempfile.TemporaryDirectory(prefix='.story-images-',dir=root) as temp:
   stage=Path(temp)
   for key,data in replacements.items():
    (stage/key).parent.mkdir(exist_ok=True);(stage/key).write_bytes(data);(stage/key).chmod(0o644)
   try:
    for key in replacements:os.replace(stage/key,root/key)
   except BaseException:
    for key in originals:shutil.copyfile(backup/key,root/key)
    raise
  print('Lugude sisupildid paigaldatud. Varukoopia:',backup)
if __name__=='__main__':
 p=argparse.ArgumentParser(description=__doc__);p.add_argument('--root',type=Path,default=Path('/var/www/mis-jama.olis.ee'));p.add_argument('--state-dir',type=Path,default=Path('/var/lib/mis-jama'));p.add_argument('--backup-root',type=Path,default=Path('/var/backups/mis-jama-story-images'));a=p.parse_args();install(a.root,a.state_dir,a.backup_root)

