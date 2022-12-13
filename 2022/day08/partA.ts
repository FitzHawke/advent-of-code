export default function (input: string): number {
  const trees = input.split('\n');
  let count = (trees.length + trees[0].length - 2) * 2;
  const dirs: number[][] = [
    [-1, 0],
    [1, 0],
    [0, 1],
    [0, -1],
  ];

  const isVisible = (y: number, x: number, t: number): boolean => {
    let maxX = trees[0].length;
    let maxY = trees.length;

    for (const dir of dirs) {
      let curr: number[] = [y, x];
      let visible = true;
      while (visible) {
        curr = [curr[0] + dir[0], curr[1] + dir[1]];
        if (curr[0] < 0 || curr[0] >= maxY || curr[1] < 0 || curr[1] >= maxX)
          break;
        if (Number(trees[curr[0]][curr[1]]) >= t) {
          visible = false;
        }
      }
      if (visible) return true;
    }

    return false;
  };

  for (let i = 1; i < trees.length - 1; i++) {
    for (let j = 1; j < trees[0].length - 1; j++) {
      const tree = Number(trees[i][j]);
      if (isVisible(i, j, tree)) {
        count++;
      }
    }
  }

  return count;
}
