export default function (input: string) {
  const inp = input.trim().split("\n");
  const tailPos = new Set().add("0,0");
  let head = [0, 0],
    tail = [0, 0];

  const dirs: { [key: string]: number[] } = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  const moveTail = (pastX: number, pastY: number): void => {
    if (Math.abs(head[0] - tail[0]) > 1 || Math.abs(head[1] - tail[1]) > 1) {
      tail = [pastX, pastY];
      tailPos.add(tail.join(","));
    }
  };

  for (let i = 0; i < inp.length; i++) {
    const [dir, steps] = inp[i].split(" ");
    let d: number[] = dirs[dir];
    for (let j = 0; j < Number(steps); j++) {
      const [pastX, pastY] = head;
      head = [head[0] + d[0], head[1] + d[1]];
      moveTail(pastX, pastY);
    }
  }

  return tailPos.size;
}
