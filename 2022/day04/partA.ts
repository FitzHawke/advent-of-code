export default function (input: string): number {
  const shifts = input.split('\n');
  let count = 0;

  for (let i of shifts) {
    let [start1, mid, end2] = i.split('-');
    let [end1, start2] = mid.split(',');

    if (
      (+start1 <= +start2 && +end1 >= +end2) ||
      (+start2 <= +start1 && +end2 >= +end1)
    ) {
      count++;
    }
  }
  return count;
}
