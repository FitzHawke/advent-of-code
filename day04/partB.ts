import { readFileSync } from 'fs';

const input = readFileSync('./input.txt').toString().split('\n');

let count = 0;

for (let i of input) {
  let [start1, mid, end2] = i.split('-');
  let [end1, start2] = mid.split(',');

  if (
    (+start1 <= +start2 && +end1 >= +start2) ||
    (+start2 <= +start1 && +end2 >= +start1)
  ) {
    count++;
  }
}
console.log(count);
