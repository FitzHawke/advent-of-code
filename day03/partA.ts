import { readFileSync } from "fs";

const input = readFileSync("./input.txt").toString().split("\n");

const getPrio = (s:string):number => {
  if (s.toLocaleUpperCase() === s) {
    return s.charCodeAt(0) - 38;
  } else {
    return s.charCodeAt(0) - 96;
  }
}

let total = 0;

for (let pack of input) {
  let items = new Set()
  for(let i = 0; i<pack.length; i++) {
    if (i<pack.length / 2) {
      items.add(pack[i])
    } else if (items.has(pack[i])){
      total += getPrio(pack[i])
      break;
    }
  }
}

console.log(total)