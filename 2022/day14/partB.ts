import { buildSlice, coords, mapCol } from './partA';

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
        map[y].set(x, 'o');
        stopped = true;
        break;
      }
    }
    if (y === 0) {
      done = true;
      break;
    }
  }
  return sand;
};

export default function (input: string): number {
  const map = buildSlice(input.split('\n'));
  map.push(new Map() as mapCol);
  return dropSand(map);
}
