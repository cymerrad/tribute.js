#!/usr/bin/env bash

# this doesn't work on ubuntu, but /etc/systemd/system is a pretty standard location
sudo cp tribute.js.service $(pkg-config systemd --variable=systemdsystemconfdir)

# location of app.js is variadic -> create .service file from template
# some things had to be changed
# missing /var/log dir

sudo systemctl daemon-reload
sudo systemctl start tribute.js
