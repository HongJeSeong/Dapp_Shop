#!/bin/bash

ganache-cli --acctKeys=./key.txt -h 0.0.0.0 &
truffle migrate --reset

#apachectl -D FOREGROUND

cd public && node ../src/components/server/server.js & 
npm start
