#!/bin/bash

# Shop
docker run -d -p 80:80 -p 8545:8545 -p 3000:3000 -p 4000:4000 -p 3306:3306 --name shop shop

echo "runnning docker container";
docker ps
