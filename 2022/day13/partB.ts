import { compare } from './partA';

export default function (input: string): number {
  const lines = input.split('\n').filter((line) => line !== '');
  lines.push('[[2]]', '[[6]]');
  lines.sort((l, r) => (compare(JSON.parse(l), JSON.parse(r)) ? -1 : 1));

  return (lines.indexOf('[[2]]') + 1) * (lines.indexOf('[[6]]') + 1);
}
