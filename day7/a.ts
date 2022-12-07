import { readFileSync } from "fs";

const input = readFileSync("./input").toString();

const path: string[] = [];
const sizes = new Map();

const commands = input.split("$ ");

for (let comm of commands) {
  if (comm.startsWith("cd")) {
    const name = comm.replace("cd ", "").replace("\n", "")
    name === ".." ? path.pop() : path.push(name)
  } else if (comm.startsWith("ls")) {
    const paths = comm.trim().split("\n")
    for (let i = 1; i<paths.length; i++) {
      if (!paths[i].startsWith("dir")) {
        const [size, _] = paths[i].split(" ");
        for (let i = path.length; i>=0; i--) {
          const dir = path.slice(0, i).join("/")
          sizes.set(dir, (sizes.get(dir) || 0) + +size)
        }
      }
    }
  }
}

let total = 0;

for (const [_, s] of sizes) {
  if (s <= 100000) total += s
}
console.log(total)