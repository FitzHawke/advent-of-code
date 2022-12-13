import { readFileSync } from 'fs';

const input = readFileSync('./input.txt').toString();

let len = 4;
for (let i = len; i < input.length; i++) {
  let set = new Set(input.slice(i - len, i));
  if (set.size === len) {
    console.log(i);
    break;
  }
}
