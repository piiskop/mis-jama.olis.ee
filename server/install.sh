#!/bin/sh
set -eu

# Run from the cloned repository: sudo sh server/install.sh
test "$(id -u)" -eq 0 || { echo 'Käivita sudo abil.' >&2; exit 1; }
test -f server/update.py
test -d /var/www/mis-jama.olis.ee
test ! -L /var/www/mis-jama.olis.ee
test -f /var/www/mis-jama.olis.ee/index.html

if ! getent passwd mis-jama >/dev/null; then
    useradd --system --user-group --no-create-home --home-dir /nonexistent --shell /usr/sbin/nologin mis-jama
fi
install -d -m 755 /usr/local/lib/mis-jama
install --backup=numbered -m 644 server/update.py /usr/local/lib/mis-jama/update.py
install --backup=numbered -m 644 server/mis-jama-update.service /etc/systemd/system/mis-jama-update.service
install --backup=numbered -m 644 server/mis-jama-update.timer /etc/systemd/system/mis-jama-update.timer
# Only the archive root changes owner. Existing day directories stay untouched.
chown mis-jama:mis-jama /var/www/mis-jama.olis.ee
chmod 755 /var/www/mis-jama.olis.ee
systemctl daemon-reload
# Do not enable the timer if the first integrity/readback check fails.
systemctl start mis-jama-update.service
systemctl enable --now mis-jama-update.timer
journalctl -u mis-jama-update.service -n 12 --no-pager
systemctl list-timers mis-jama-update.timer --no-pager
