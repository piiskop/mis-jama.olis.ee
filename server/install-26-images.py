#!/usr/bin/env python3
import fcntl,hashlib,json,os,shutil,tempfile,datetime
from pathlib import Path
root=Path('/var/www/mis-jama.olis.ee'); state=Path('/var/lib/mis-jama'); source=Path(__file__).resolve().parents[1]/'public'; target=root/'2026-10-26'/'index.html'
new=(source/'2026-10-26'/'index.html').read_bytes(); m=json.loads((source/'manifest.json').read_text()); spec=next(d['files']['index.html'] for d in m['days'] if d['date']=='2026-10-26'); digest=lambda b:hashlib.sha256(b).hexdigest()
if len(new)!=spec['bytes'] or digest(new)!=spec['sha256']: raise ValueError('Lähtefaili kontroll ebaõnnestus')
with (state/'update.lock').open('a') as lock:
 fcntl.flock(lock,fcntl.LOCK_EX)
 if target.parent.is_symlink() or target.is_symlink(): raise ValueError('Sümbollink ei ole lubatud')
 if not target.parent.exists(): print('Päeva veel ei ole: taimer laadib uue versiooni.'); exit(0)
 if not target.is_file() or {x.name for x in target.parent.iterdir()}!={'index.html'}: raise ValueError('Päeva failid erinevad oodatust')
 old=target.read_bytes()
 if old==new: print('Pildid juba paigaldatud.'); exit(0)
 if digest(old)!='595eff7b68fb0d6c52760da2b98527194ac0e7d792a343e0eb891fe87be2e679': raise ValueError('Olemasolev fail erineb oodatust; katkestan')
 backups=Path('/var/backups/mis-jama-story-images'); backups.mkdir(parents=True,exist_ok=True)
 backup=backups/('2026-10-26-'+datetime.datetime.now(datetime.timezone.utc).strftime('%Y%m%dT%H%M%S%fZ')+'.html'); backup.write_bytes(old); backup.chmod(0o600)
 fd,name=tempfile.mkstemp(prefix='.story-',dir=target.parent)
 try:
  with os.fdopen(fd,'wb') as f: f.write(new); f.flush(); os.fsync(f.fileno())
  os.chmod(name,0o644); os.replace(name,target)
 finally:
  if os.path.exists(name): os.unlink(name)
 print('Paigaldatud. Varukoopia:',backup)
