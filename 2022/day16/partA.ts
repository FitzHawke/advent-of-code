type Valves = {
  [key: string]: {
    rate: number;
    exits: string[];
  };
};
type Dists = {
  [key: string]: number;
};
export type DVI = {
  dists: Dists;
  impt: string[];
  valves?: Valves;
};

const getDistances = (valves: Valves): DVI => {
  const imptValves = Object.keys(valves).filter(
    (v) => valves[v].rate > 0 || v === 'AA',
  );
  const dists = {} as Dists;

  for (const start in valves) {
    if (!imptValves.includes(start)) continue;
    let cur = new Set([start]) as Set<string>;
    let next = new Set() as Set<string>;
    let dist = 0;
    dists[[start, start].join('-')] = 0;
    while (cur.size) {
      dist++;
      cur.forEach((loc) => {
        for (const loc2 of valves[loc].exits) {
          if (!dists.hasOwnProperty([start, loc2].join('-'))) {
            dists[[start, '-', loc2].join('')] = dist;
            next.add(loc2);
          }
        }
      });
      cur = next;
      next = new Set() as Set<string>;
    }
  }

  return { dists, impt: imptValves };
};

export const parseInputs = (inputs: string[]): DVI => {
  const valves: Valves = {};
  inputs.map((v) => {
    let [left, right] = v.split('; ');
    const rate = Number(left.split('=').at(-1));
    const id = left.split(' ')[1];
    const exits = right.replaceAll(',', '').split(' ').slice(4);
    valves[id] = { rate, exits };
  });
  return { valves, ...getDistances(valves) };
};

const main = (input: string, time: number): number => {
  const { valves, dists, impt } = parseInputs(input.split('\n'));

  const findBest = (cur: string, time: number, seen: string[]): number => {
    seen.push(cur);
    const important = impt.filter((i) => !seen.includes(i));
    let best = 0;

    for (const im of important) {
      const timeLeft = time - dists[[cur, im].join('-')] - 1;
      if (timeLeft >= 0) {
        let flow = valves![im].rate * timeLeft;
        flow += findBest(im, timeLeft, [...seen]);
        if (flow > best) best = flow;
      }
    }
    return best;
  };
  return findBest('AA', time, []);
};

export default function (input: string, time: number): number {
  console.log('\nDay 16: Proboscidea Volcanium\nPart A');
  const startTime = new Date();
  const result = main(input, time);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
