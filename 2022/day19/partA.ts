type Blueprint = {
  id: number;
  ore: number;
  clay: number;
  obsi: number;
  obsiClay: number;
  geode: number;
  geodeObsi: number;
};

type Amounts = {
  ore: number;
  oreMine: number;
  clay: number;
  clayMine: number;
  obsi: number;
  obsiMine: number;
  geode: number;
};

export const parseData = (input: string): Blueprint[] => {
  return input.split('\n').reduce((acc, r) => {
    const bp = r.split(' ');
    acc.push({
      id: Number(bp[1].replace(':', '')),
      ore: Number(bp[6]),
      clay: Number(bp[12]),
      obsi: Number(bp[18]),
      obsiClay: Number(bp[21]),
      geode: Number(bp[27]),
      geodeObsi: Number(bp[30]),
    });
    return acc;
  }, [] as Blueprint[]);
};

export const calcGeodes = (bp: Blueprint, time: number): number => {
  const seen = new Set() as Set<string>;
  let maxGeodes = 0;
  const maxOre = Math.max(bp.clay, bp.obsi, bp.geode);

  const recurse = (timeLeft: number, amt: Amounts): void => {
    if (timeLeft <= 1) return;
    let { ore, oreMine, clay, clayMine, obsi, obsiMine, geode } = amt;

    if (obsi > 2 * bp.geodeObsi) obsi = 2 * bp.geodeObsi;
    if (clay > 2 * bp.obsiClay) clay = 2 * bp.obsiClay;
    if (ore > 3 * maxOre) ore = 3 * maxOre;

    let memoStr = [
      timeLeft,
      ore,
      oreMine,
      clay,
      clayMine,
      obsi,
      obsiMine,
      geode,
    ].join('-');
    if (seen.has(memoStr)) return;

    seen.add(memoStr);

    if (ore >= bp.geode && obsi >= bp.geodeObsi) {
      if (maxGeodes < geode + timeLeft - 1) {
        maxGeodes = geode + timeLeft - 1;
      }

      recurse(timeLeft - 1, {
        ore: ore + oreMine - bp.geode,
        oreMine,
        clay: clay + clayMine,
        clayMine,
        obsi: obsi + obsiMine - bp.geodeObsi,
        obsiMine,
        geode: geode + timeLeft - 1,
      });
      return;
    }

    if (
      ore >= bp.obsi &&
      clay >= bp.obsiClay &&
      obsiMine < bp.geodeObsi &&
      time >= 2
    ) {
      recurse(timeLeft - 1, {
        ore: ore + oreMine - bp.obsi,
        oreMine,
        clay: clay + clayMine - bp.obsiClay!,
        clayMine,
        obsi: obsi + obsiMine,
        obsiMine: obsiMine + 1,
        geode,
      });
    }

    if (ore >= bp.clay && clayMine < bp.obsiClay && time >= 3) {
      recurse(timeLeft - 1, {
        ore: ore + oreMine - bp.clay,
        oreMine,
        clay: clay + clayMine,
        clayMine: clayMine + 1,
        obsi: obsi + obsiMine,
        obsiMine,
        geode,
      });
    }

    if (ore >= bp.ore && oreMine < maxOre) {
      recurse(timeLeft - 1, {
        ore: ore + oreMine - bp.ore,
        oreMine: oreMine + 1,
        clay: clay + clayMine,
        clayMine,
        obsi: obsi + obsiMine,
        obsiMine,
        geode,
      });
    }
    recurse(timeLeft - 1, {
      ore: ore + oreMine,
      oreMine,
      clay: clay + clayMine,
      clayMine,
      obsi: obsi + obsiMine,
      obsiMine,
      geode,
    });
  };
  recurse(time, {
    ore: 0,
    oreMine: 1,
    clay: 0,
    clayMine: 0,
    obsi: 0,
    obsiMine: 0,
    geode: 0,
  });
  return maxGeodes;
};

const main = (input: string, time: number): number => {
  const blueprints = parseData(input);
  let quality = 0;
  for (const bp of blueprints) {
    const qual = calcGeodes(bp, time);
    quality += qual * bp.id;
  }
  return quality;
};

export default function part(input: string, time: number): number {
  console.log('\nDay 19: Not Enough Minerals\nPart A');
  const startTime = new Date();
  const result = main(input, time);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
