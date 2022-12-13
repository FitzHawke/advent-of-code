type recArr = Array<recArr | number> | number;

export const compare = (l: recArr, r: recArr): boolean | undefined => {
  if (typeof l === 'number' && typeof r === 'number') {
    if (l > r) return false;
    else if (l < r) return true;
    return undefined;
  } else if (Array.isArray(l) && Array.isArray(r)) {
    for (let i = 0; i < l.length && i < r.length; i++) {
      const comparison = compare(l[i], r[i]);
      if (comparison !== undefined) return comparison;
    }

    if (l.length > r.length) return false;
    else if (l.length < r.length) return true;
    return undefined;
  } else {
    if (Array.isArray(l)) return compare(l, [r]);
    if (Array.isArray(r)) return compare([l], r);
  }
  return undefined;
};

export default function (input: string): number {
  const pairs = input.split('\n\n');
  let pairNo = 0,
    goodSum = 0;

  for (const pair of pairs) {
    pairNo++;
    const [left, right] = pair.split('\n');
    if (compare(JSON.parse(left), JSON.parse(right))) {
      goodSum += pairNo;
    }
  }
  return goodSum;
}
