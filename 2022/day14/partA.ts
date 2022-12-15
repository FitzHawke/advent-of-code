type space = '#' | 'o';
export type mapCol = Map<number, space>;
export type coords = [number, number];

const buildWall = (dir1: coords, dir2: coords, map: mapCol[]): mapCol[] => {
  const [x1, y1] = dir1,
    [x2, y2] = dir2;
  if (x1 === x2) {
    if (y1 < y2) for (let i = y1; i <= y2; i++) map[i].set(x1, '#');
    else for (let i = y2; i <= y1; i++) map[i].set(x1, '#');
  } else {
    if (x1 < x2) for (let i = x1; i <= x2; i++) map[y1].set(i, '#');
    else for (let i = x2; i <= x1; i++) map[y1].set(i, '#');
  }
  return map;
};

export const buildSlice = (structures: string[]): mapCol[] => {
  const map: mapCol[] = [];

  const addRows = (n: number): void => {
    for (let i = 0; i <= n; i++) {
      if (!map[i]) map[i] = new Map() as mapCol;
    }
  };

  for (const struct of structures) {
    const lines = struct.split(' -> ');
    for (let i = 0; i < lines.length - 1; i++) {
      const [x1, y1] = lines[i].split(',');
      const [x2, y2] = lines[i + 1].split(',');
      if (Number(y1) < Number(y2) && map.length < Number(y2))
        addRows(Number(y2));
      else if (map.length < Number(y1)) addRows(Number(y1));
      buildWall([Number(x1), Number(y1)], [Number(x2), Number(y2)], map);
    }
  }
  return map;
};

const dropSand = (map: mapCol[]): number => {
  let sand = 0,
    done = false;
  let stack = [[500, 0]] as coords[];
  while (!done) {
    sand++;
    let stopped = false;
    let [x, y] = stack.pop() || [500, 0];
    while (!stopped) {
      if (!map[y + 1].has(x)) {
        stack.push([x, y]);
        y += 1;
      } else if (!map[y + 1].has(x - 1)) {
        stack.push([x, y]);
        y += 1;
        x -= 1;
      } else if (!map[y + 1].has(x + 1)) {
        stack.push([x, y]);
        y += 1;
        x += 1;
      } else {
        map[y].set(x, 'o');
        stopped = true;
      }

      if (y === map.length - 1) {
        stopped = true;
        done = true;
        break;
      }
    }
  }
  return sand - 1;
};

export default function (input: string): number {
  const map = buildSlice(input.split('\n'));
  return dropSand(map);
}
