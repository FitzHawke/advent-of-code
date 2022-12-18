type Coord = [number, number];
type Tower = Map<number, number[]>;
type Memo = Map<string, Memoized>;
type Memoized = {
  prevLines: string;
  height: 0 | 1 | 2 | 3;
  cycle: boolean;
};

const rocks: Coord[][] = [
  // from bottom left corner @ 0,0
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
  ], // horizontal line
  [
    [0, 1],
    [1, 0],
    [1, 1],
    [1, 2],
    [2, 1],
  ], // + shape
  [
    [0, 0],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
  ], // backwards L shape
  [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
  ], // vertical line
  [
    [0, 0],
    [0, 1],
    [1, 0],
    [1, 1],
  ], // square
];

const getWidth = (rock: Coord[]): number => {
  let width = 0;
  for (const loc of rock) {
    width = Math.max(width, loc[0]);
  }
  return width;
};

const addRows = (tower: Tower, height: number, memoNumber: number): string => {
  let res = '';
  for (let i = height; i > height - memoNumber; i--) {
    if (tower.has(i)) {
      res += tower.get(i)?.join('');
    }
  }
  return res;
};

const checkCollision = (
  tower: Tower,
  rock: Coord[],
  left: number,
  bottom: number,
  width: number,
): boolean => {
  if (bottom < 1) return true;
  if (left < 0) return true;
  if (left + width >= 7) return true;
  for (const loc of rock) {
    if (
      tower.has(loc[1] + bottom) &&
      tower.get(loc[1] + bottom)![loc[0] + left] === 1
    )
      return true;
  }
  return false;
};

const main = (input: string, rockDrops: number): number => {
  const wind = input.trim();
  const memoNumber = 25;
  let direction = 0,
    newRock = 0;
  const tower = new Map() as Tower;
  let count = 0,
    height = 0;
  const memo = new Map() as Memo;
  let useMemo = false,
    memNum = '0',
    oldMem = '0',
    cycling = false,
    cycleHeight = 0,
    cycleCount = 0;

  while (count < rockDrops - 1) {
    // solution to weird off by 1 error ¯\_(ツ)_/¯
    if (useMemo) {
      const infoFromMemo = memo.get(oldMem);
      oldMem = infoFromMemo!.prevLines;
      if (infoFromMemo!.cycle && !cycling) {
        cycling = true;
      } else if (infoFromMemo!.cycle) {
        const cycles = Math.floor((rockDrops - count) / (count - cycleCount));
        console.log(cycles, count, cycleCount);
        count += (count - cycleCount) * cycles;
        height += (height - cycleHeight) * cycles;
        continue;
      }
      height += infoFromMemo!.height;
      count += 1;
    } else {
      const rock = rocks[newRock];
      const width = getWidth(rock);
      let rockLoc: Coord = [2, height + 4];
      let moving = true;
      let oldHeight = height;
      while (moving) {
        let moveDir = 0;

        if (wind[direction] === '>') moveDir = 1;
        else moveDir = -1;

        if (
          !checkCollision(tower, rock, rockLoc[0] + moveDir, rockLoc[1], width)
        )
          rockLoc[0] += moveDir;

        direction = (direction + 1) % wind.length;

        if (checkCollision(tower, rock, rockLoc[0], rockLoc[1] - 1, width)) {
          moving = false;
          for (const loc of rock) {
            let row = tower.get(rockLoc[1] + loc[1]);
            if (row === undefined) row = Array(7).fill(0);
            row[rockLoc[0] + loc[0]] = 1;
            tower.set(loc[1] + rockLoc[1], row);
            height = Math.max(height, loc[1] + rockLoc[1]);
          }
        } else {
          rockLoc[1] -= 1;
        }
      }
      oldMem = memNum;
      newRock = (newRock + 1) % rocks.length;
      if (memo.has(oldMem)) {
        useMemo = true;
        memo.set(oldMem, { ...memo.get(oldMem)!, cycle: true });
        cycleHeight = height;
        cycleCount = count;
        continue;
      }
      memNum = `${addRows(tower, height, memoNumber)}${
        wind[direction]
      }${newRock}`;
      memo.set(oldMem, {
        prevLines: memNum,
        height: height - oldHeight,
        cycle: false,
      } as Memoized);
      count += 1;
    }
  }
  return height;
};

export default function (input: string, rockDrops: number): number {
  console.log('\nDay 17: Pyroclastic Flow\nPart B');
  const startTime = new Date();
  const result = main(input, rockDrops);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
