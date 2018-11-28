# tribute.js
## What is it?
It's a small utility I direly need in my life.  
This is a fully autonomous tool for ~~spamming~~ sending messages on fb's messenger.
In its current (daemonized) form I could use it as a control on my home server.

## Notes
'public.tar.gz' contains a lot of code I just copied raw from M$'s example.
It's tared so it won't add to Github's "language details".

Remember to update the systemd daemon after every change to the .service file

$ systemctl daemon-reload
Then start the service with, and enable the service to start at reboot

$ systemctl start myservice
$ systemctl enable myservice
