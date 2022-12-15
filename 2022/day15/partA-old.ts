// Need to rewrite D:
export type SMaps = {
  [key: number]: SensorMap;
};
type SensorMap = Map<number, Loc>;
type Loc = 'B' | 'S' | '#';

const buildMap = (rawLocs: string[], row: number): SMaps => {
  const map = {} as SMaps;
  map[row] = new Map() as SensorMap;

  for (const loc of rawLocs) {
    const [sLoc, bLoc] = loc.split(':');
    const [x1, y1] = sLoc
      .split(',')
      .map((ele) => Number(ele.split('=').at(-1)));
    const [x2, y2] = bLoc
      .split(',')
      .map((ele) => Number(ele.split('=').at(-1)));

    const dist = Math.abs(x1 - x2) + Math.abs(y1 - y2);
    // if (!map[y1 + dist] || !map[y1 - dist]) addRows(y1 - dist, y1 + dist);

    if (y1 === row) map[y1].set(x1, 'S');
    if (y2 === row) map[y2].set(x2, 'B');

    const width = dist - Math.abs(y1 - row);
    for (let j = x1 - width; j <= x1 + width; j++) {
      if (!map[row].has(j)) map[row].set(j, '#');
    }
  }
  return map;
};

export default function (input: string, row: number): number {
  const map = buildMap(input.split('\n'), row);

  let count = 0;
  for (const val of map[row].values()) {
    if (val === '#') count++;
  }

  return count;
}
