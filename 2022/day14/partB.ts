import { buildSlice, mapCol } from './partA';

const dropSand = (map: mapCol[]): number => {
  let sand = 0,
    done = false;
  while (!done) {
    sand++;
    let stopped = false;
    let [x, y] = [500, 0];
    while (!stopped) {
      if (!map[y + 1].has(x)) {
        y += 1;
      } else if (!map[y + 1].has(x - 1)) {
        y += 1;
        x -= 1;
      } else if (!map[y + 1].has(x + 1)) {
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
