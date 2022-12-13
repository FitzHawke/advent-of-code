#!/bin/bash

# arg 1 - year
# arg 2 - day#

echo "$1"
echo "$2"

mkdir -p ./$1/day$2
cp template/* ./$1/day$2/

sed -i "s/template/day$2/" ./$1/day$2/index.test.ts

echo https://adventofcode.com/$1/day/$2 >./$1/day$2/README.md
