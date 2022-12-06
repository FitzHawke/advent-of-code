import { readFileSync } from "fs";

const input = readFileSync("./input").toString();

let last13:string[] = new Array().fill("", 14)
let count = 0;

const check = (last3:string[], l:string):boolean => {
  let [l1,l2,l3] = last3
  return (l !== l1 && l !== l2 && l !== l3 && l1 !== l2 && l1 !== l3 && l2 !== l3 && l1 !== "")
}

for (let l of input) {
  count++;
  
  console.log(last13,l)
  if (check(last13, l)) {
    break;
  } else {
    last13.shift()
    last13.push(l)
  }
}

console.log(count);