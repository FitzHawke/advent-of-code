export default function (input: string): number {
  const inp = input.trim().split("\n");
  const tailPos = new Set().add("0,0");
  let knots: number[][] = new Array(10).fill([0, 0]);

  const dirs: { [key: string]: number[] } = {
    R: [1, 0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1],
  };

  const moveKnot = (knot: number[], pKnot: number[]): number[] => {
    if (Math.abs(knot[0] - pKnot[0]) > 1 || Math.abs(knot[1] - pKnot[1]) > 1) {
      let diff = [Math.sign(pKnot[0] - knot[0]), Math.sign(pKnot[1] - knot[1])];
      knot = [knot[0] + diff[0], knot[1] + diff[1]];
    }
    return knot;
  };

  for (let i = 0; i < inp.length; i++) {
    const [dir, steps] = inp[i].split(" ");
    let d: number[] = dirs[dir];
    for (let j = 0; j < Number(steps); j++) {
      knots[0] = [knots[0][0] + d[0], knots[0][1] + d[1]];
      for (let k = 1; k < knots.length; k++) {
        knots[k] = moveKnot(knots[k], knots[k - 1]);
        if (k === knots.length - 1) tailPos.add(knots[k].join(","));
      }
    }
  }

  return tailPos.size;
}
