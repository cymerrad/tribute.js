#!/usr/bin/env bash
file_dir=$(dirname $(realpath $0))
cd $file_dir

node ./dist/server.js $@