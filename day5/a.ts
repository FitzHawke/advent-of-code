import { readFileSync } from "fs";

const input = readFileSync("./input").toString().split("\n\n");

const pic = input[0].split("\n")

let stacks: string[][] = [];

for (let i = pic.length-2; i >= 0; i--) {
  for (let j = 1; j<pic[0].length; j+=4) {
    let stack = Math.floor(j/4)
    if (!stacks[stack]) stacks[stack] = []
    if (pic[i][j] !== " ") stacks[stack].push(pic[i][j])
  }
}

const insts = input[1].split("\n")

for (let i of insts) {
  const n = i.split(" ")
  for (let j = 0; j < +n[1]; j++){
    const tmp = stacks[+n[3]-1].pop()
    if (tmp) stacks[+n[5]-1].push(tmp)
  }
}

console.log(stacks.reduce((acc,c)=>acc+c.at(-1),''))