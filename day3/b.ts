import { readFileSync } from "fs";

const input = readFileSync("./input").toString().split("\n");

const getPrio = (s:string):number => {
  if (s.toLocaleUpperCase() === s) {
    return s.charCodeAt(0) - 38;
  } else {
    return s.charCodeAt(0) - 96;
  }
}

let total = 0;

for (let i=0; i<input.length; i+=3) {
  let items = new Set()
  let common = new Set()
  let packA = input[i], packB = input[i+1], packC = input[i+2]
  for(let i = 0; i<packA.length; i++) {
    items.add(packA[i])
  }
  for(let i = 0; i<packB.length; i++) {
    if (items.has(packB[i])) {
      common.add(packB[i])
    }
  }
  for(let i = 0; i<packC.length; i++) {
    if (common.has(packC[i])){
      total += getPrio(packC[i])
      break;
    }
  }
}

console.log(total)