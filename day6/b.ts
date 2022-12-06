import { readFileSync } from "fs";

const input = readFileSync("./input").toString();

let last13: string[] = new Array(14).fill("");
let count = 0;

const check = (last14: string[]): boolean => {
  for (let i = 0; i < last14.length; i++) {
    for (let j = i + 1; j < last14.length; j++) {
      if (last14[i] === last14[j]) return false;
    }
  }
  return true;
};

for (let l of input) {
  if (check([...last13, l])) {
    break;
  } else {
    last13.shift();
    last13.push(l);
  }
  count++;
}

console.log(count);
