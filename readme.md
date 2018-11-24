# tribute.js
## What is it?
It's a small utility I direly need in my life.  
This is a fully autonomous tool for ~~spamming~~ sending messages on fb's messenger.
In its current (daemonized) form I could use it as a control on my home server.

## Notes
Remember to update the systemd daemon after every change to the .service file

$ systemctl daemon-reload
Then start the service with, and enable the service to start at reboot

$ systemctl start myservice
$ systemctl enable myservice