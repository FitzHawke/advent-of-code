import { DVI, parseInputs } from './partA';

type Routes = {
  [key: string]: number;
};

const main = (input: string, time: number): number => {
  const { valves, dists, impt }: DVI = parseInputs(input.split('\n'));
  const routes = {} as Routes;

  const findBest = (
    cur: string,
    flow: number,
    time: number,
    seen: string[],
  ): number => {
    seen.push(cur);
    const important = impt.filter((i) => !seen.includes(i));

    const route = seen
      .filter((s) => s !== 'AA')
      .sort()
      .join('-');
    if (routes[route]) routes[route] = Math.max(flow, routes[route]);
    else routes[route] = flow;

    let best = 0;
    for (const im of important) {
      const timeLeft = time - dists[[cur, im].join('-')] - 1;
      if (timeLeft >= 0) {
        let newFlow = valves![im].rate * timeLeft;
        newFlow += findBest(im, flow + newFlow, timeLeft, [...seen]);
        if (newFlow > best) best = newFlow;
      }
    }
    return best;
  };
  findBest('AA', 0, time, []);

  const findRest = (cur: string[]): number => {
    const curStr = cur.sort().join('-');
    if (!routes[curStr]) {
      let best = 0;
      for (const c of cur) {
        const newCur = cur.filter((i) => i !== c);
        const flow = findRest(newCur);
        if (flow > best) best = flow;
      }
      routes[curStr] = best;
    }
    return routes[curStr];
  };
  findRest(impt.filter((i) => i !== 'AA'));

  let best = 0;
  for (const h of Object.keys(routes)) {
    const hArr = h.split('-');
    const e = impt
      .filter((i) => i !== 'AA' && !hArr.includes(i))
      .sort()
      .join('-');
    let total = routes[h] + routes[e];
    if (total > best) best = total;
  }
  return best;
};

export default function (input: string, time: number): number {
  console.log('\nDay 16: Proboscidea Volcanium\nPart B');
  const startTime = new Date();
  const result = main(input, time);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
