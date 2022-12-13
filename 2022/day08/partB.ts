export default function (input: string): number {
  const trees = input.split('\n');
  const dirs: number[][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const rating = (y: number, x: number, t: number): number => {
    let maxX = trees[0].length;
    let maxY = trees.length;
    let rating = 1;

    for (const dir of dirs) {
      let count = 0;
      let curr: number[] = [y, x];
      let visible = true;
      while (visible) {
        curr = [curr[0] + dir[0], curr[1] + dir[1]];
        if (curr[0] < 0 || curr[0] >= maxY || curr[1] < 0 || curr[1] >= maxX)
          break;
        count++;
        if (Number(trees[curr[0]][curr[1]]) >= t) {
          visible = false;
        }
      }
      rating *= count;
    }

    return rating;
  };

  let maxRate = 0;

  for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees[0].length; j++) {
      const tree = Number(trees[i][j]);
      maxRate = Math.max(rating(i, j, tree), maxRate);
    }
  }

  return maxRate;
}
