#!/usr/bin/env bash
sudo cp tribute.js.service $(pkg-config systemd --variable=systemdsystemconfdir)

sudo systemctl daemon-reload
sudo systemctl start tribute.js