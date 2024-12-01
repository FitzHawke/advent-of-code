import { parseInput } from './partA.js';

const main = (input: string): number => {
	const lists = parseInput(input);
	const map: { [key: number]: number } = {};

	lists.l2.map((cur) => (map[cur] = map[cur] + 1 || 1));

	let score = 0;
	for (let i =0;i<lists.l1.length;i++){
		let val = lists.l1[i]
		score += val * (map[val] || 0)
	}

	return score
};

export default function (input: string, title: string): number {
	console.log(`\nDay 01: ${title}\nPart B`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
