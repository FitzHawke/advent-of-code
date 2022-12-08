import { readFileSync } from "fs";

const input = readFileSync("./input.txt").toString();

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
totals.sort((a, b) => b - a);
console.log(totals[0] + totals[1] + totals[2]);
