#!/bin/bash
set -e
base_dir=$(dirname $(realpath $0))
cd $base_dir
/usr/local/bin/node headless.js >> output.log 2>&1

count=.count
touch $count
num=$(( $(cat $count) + 1 ))
echo $num > $count
