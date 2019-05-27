# tribute.js
## What is it?
It's a small utility I direly need in my life.  
This is a fully autonomous tool for ~~spamming~~ sending messages on fb's messenger.
In its current form I use it via an API on my home server with some crontab tasks scheduled.

## Notes
'public.tar.gz' contains a lot of code I just copied raw from M$'s example.
It's tared so it won't add to Github's "language details".

Remember to update the systemd daemon after every change to the .service file
```
$ systemctl daemon-reload  
$ systemctl start myservice    
$ systemctl enable myservice   
```
