export const getPrio = (s: string): number => {
  if (s.toLocaleUpperCase() === s) {
    return s.charCodeAt(0) - 38;
  } else {
    return s.charCodeAt(0) - 96;
  }
};

export default function (input: string): number {
  const sacks = input.split('\n');
  let total = 0;

  for (let pack of sacks) {
    let items = new Set();
    for (let i = 0; i < pack.length; i++) {
      if (i < pack.length / 2) {
        items.add(pack[i]);
      } else if (items.has(pack[i])) {
        total += getPrio(pack[i]);
        break;
      }
    }
  }

  return total;
}
