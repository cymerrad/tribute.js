#!/bin/bash
file_dir=$(dirname $(realpath $0))
cd $file_dir

#log_loc=/var/log/tribute.js.log
#touch $log_loc

/usr/bin/node ./dist/server.js
