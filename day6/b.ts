import { readFileSync } from "fs";

const input = readFileSync("./input").toString();

let len = 14
for (let i = len; i<input.length; i++) {
  let set = new Set(input.slice(i-len,i))
  if (set.size === len) {
    console.log(i)
    break;
  }
}