import { readFileSync } from "fs";

const input = readFileSync("./input").toString();

let last3 = ["", "", ""]
let count = 0;

const check = (last3:string[], l:string):boolean => {
  let [l1,l2,l3] = last3
  return (l !== l1 && l !== l2 && l !== l3 && l1 !== l2 && l1 !== l3 && l2 !== l3 && l1 !== "")
}

for (let l of input) {
  count++;
  if (check(last3, l)) {
    break;
  } else {
    last3.shift()
    last3.push(l)
  }
}

console.log(count);