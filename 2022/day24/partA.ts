type BlizMap = Map<string, string[]>;
type BlizMapTime = { [key: number]: BlizMap };

type MinMax = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  start: string;
  end: string;
  maxMaps: number;
};

type QueueArr = [number, number, number];

export const parseBlizzards = (input: string): BlizMapTime => {
  const map = new Map() as BlizMap;

  input.split('\n').forEach((line, y) => {
    line.split('').forEach((loc, x) => {
      if (loc !== '.') map.set([x, y].join(','), [loc]);
    });
  });

  return { 0: map } as BlizMapTime;
};

const calcBlizOverTime = (
  timeMap: BlizMapTime,
  time: number,
  minMax: MinMax,
): void => {
  const prev = timeMap[time - 1];
  const newMap = new Map() as BlizMap;
  const dirs = {
    '>': [1, 0],
    '<': [-1, 0],
    v: [0, 1],
    '^': [0, -1],
  } as { [key: string]: [number, number] };

  prev.forEach((blizList, loc) => {
    if (blizList[0] === '#') {
      newMap.set(loc, ['#']);
    } else {
      blizList.forEach((bliz) => {
        const [x, y] = loc.split(',').map(Number);
        const newLoc = [x + dirs[bliz][0], y + dirs[bliz][1]];

        if (newLoc[0] < minMax.minX) newLoc[0] = minMax.maxX;
        else if (newLoc[0] > minMax.maxX) newLoc[0] = minMax.minX;

        if (newLoc[1] < minMax.minY) newLoc[1] = minMax.maxY;
        else if (newLoc[1] > minMax.maxY) newLoc[1] = minMax.minY;

        const newLocStr = newLoc.join(',');
        if (newMap.has(newLocStr)) {
          newMap.set(newLocStr, [...newMap.get(newLocStr)!, bliz]);
        } else {
          newMap.set(newLocStr, [bliz]);
        }
      });
    }
  });
  timeMap[time] = newMap;
};

export const findPath = (
  timeMap: BlizMapTime,
  minMax: MinMax,
  start: number[],
  end: number[],
  time: number = 0,
): number => {
  const [startX, startY] = start;
  const [endX, endY] = end;
  const queue: QueueArr[] = [[startX, startY, time]];
  const seen = new Set() as Set<string>;

  const moves = [
    [0, 0],
    [1, 0],
    [0, 1],
    [-1, 0],
    [0, -1],
  ];

  while (queue.length > 0) {
    const [curX, curY, time] = queue.shift()!;
    if (curX === endX && curY === endY) return time;

    if (!timeMap.hasOwnProperty((time + 1) % minMax.maxMaps)) {
      calcBlizOverTime(timeMap, time + 1, minMax);
    }

    const seenStr = [time % minMax.maxMaps, curX, curY].join(',');
    if (seen.has(seenStr)) continue;
    else seen.add(seenStr);

    for (const move of moves) {
      const x = curX + move[0];
      const y = curY + move[1];
      if (
        !timeMap[(time + 1) % minMax.maxMaps].has([x, y].join(',')) &&
        x <= minMax.maxX &&
        x >= minMax.minX &&
        y <= minMax.maxY + 1 &&
        y >= minMax.minY - 1
      ) {
        queue.push([x, y, time + 1]);
      }
    }
  }
  return 0;
};

export const calcMinMax = (map: BlizMap): MinMax => {
  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  map.forEach((_val, loc) => {
    const [x, y] = loc.split(',').map(Number);
    if (x > maxX) maxX = x;
    if (x < minX) minX = x;
    if (y > maxY) maxY = y;
    if (y < minY) minY = y;
  });
  return {
    minX: minX + 1,
    minY: minY + 1,
    maxX: maxX - 1,
    maxY: maxY - 1,
    start: [minX + 1, minY].join(','),
    end: [maxX - 1, maxY].join(','),
    maxMaps: (maxX - minX - 1) * (maxY - minY - 1),
  };
};

const main = (input: string): number => {
  const map = parseBlizzards(input);
  const minMax = calcMinMax(map[0]);
  const start = minMax.start.split(',').map(Number);
  const end = minMax.end.split(',').map(Number);
  const steps = findPath(map, minMax, start, end);
  return steps;
};

export default function (input: string): number {
  console.log('\nDay 24: Blizzard Basin\nPart A');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
