# tribute.js
## What is it?
It's a another small utility I direly need in my life.  
I will try to make it a fully autonomous tool for ~~spamming~~ sending messages on fb's messenger.

## TODO
1. crontab
1. nice and secure way to pass in credentials
1. installation/packaging

## Notes
Remember to update the systemd daemon after every change to the .service file

$ systemctl daemon-reload
Then start the service with, and enable the service to start at reboot

$ systemctl start myservice
$ systemctl enable myservice