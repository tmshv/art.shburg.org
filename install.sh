#!/bin/sh

dir_path="$1"
build_file="$2"
app="hudozka"
script="forever.json"

cd ${dir_path}

gunzip -c ${build_file} | tar xopf -

#rm build.tar

npm install --production --loglevel error

#starting www
if forever restart ${app}; then
    echo App restarted
else
    forever start ${script}
    echo App started
fi
