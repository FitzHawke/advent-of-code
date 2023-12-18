#!/bin/bash

# arg 1 - 4 digit year as 2022
# arg 2 - day of challenge as 1-2 digits. 1-25
# arg 3 - "challenge title"

day=$(printf "%.2i" $2)

mkdir -p ./$1/day$day
cp template/* ./$1/day$day/

sed -i "s/tempYear/$1/" ./$1/day$day/index.test.ts
sed -i "s/tempDay/day$day/" ./$1/day$day/index.test.ts
sed -i "s/tempTitle/$3/" ./$1/day$day/index.test.ts

sed -i "s/##/$day/" ./$1/day$day/partA.ts
sed -i "s/##/$day/" ./$1/day$day/partB.ts

echo https://adventofcode.com/$1/day/$2 >./$1/day$day/README.md
