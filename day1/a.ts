import { readFileSync } from "fs";

const input = readFileSync("./input").toString();

let arr = input.split("\n");

let totals: number[] = [];
let count = 0;

for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "") {
    totals.push(count);
    count = 0;
  } else {
    count += Number(arr[i]);
  }
}
totals.push(count);
console.log(Math.max(...totals));
