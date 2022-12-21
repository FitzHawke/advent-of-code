export type Num = { num: number };
type NumList = {
  z: Num;
  nums: Num[];
};

export const parseInputs = (input: string, key: number = 1): NumList => {
  let numList = {} as NumList;
  numList.nums = input
    .trim()
    .split('\n')
    .map((n) => {
      const num = { num: Number(n) * key };
      if (Number(n) === 0) numList.z = num;
      return num;
    });

  return numList;
};

export const mixer = (nums: Num[], mixes: number): Num[] => {
  const mixed = [...nums];

  for (let i = 0; i < mixes; i++) {
    for (const num of nums) {
      const newIdx = (mixed.indexOf(num) + num.num) % (nums.length - 1);
      mixed.splice(newIdx, 0, ...mixed.splice(mixed.indexOf(num), 1));
    }
  }

  return mixed;
};

export const calculateCoords = (mixed: Num[], z: Num): number => {
  const zIdx = mixed.indexOf(z);
  console.log(mixed, zIdx);
  return [1000, 2000, 3000].reduce((acc, c) => {
    return (acc += mixed[(zIdx + c) % mixed.length].num);
  }, 0);
};

const main = (input: string): number => {
  const numList = parseInputs(input);
  const mixed = mixer(numList.nums, 1);
  return calculateCoords(mixed, numList.z);
};

export default function (input: string): number {
  console.log('\nDay 20: Grove Positioning System\nPart A');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
