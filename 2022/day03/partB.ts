import { getPrio } from './partA';

export default function (input: string): number {
	const sacks = input.split('\n');
	let total = 0;

	for (let i = 0; i < sacks.length; i += 3) {
		let items = new Set();
		let common = new Set();
		let packA = sacks[i],
			packB = sacks[i + 1],
			packC = sacks[i + 2];
		for (let i = 0; i < packA.length; i++) {
			items.add(packA[i]);
		}
		for (let i = 0; i < packB.length; i++) {
			if (items.has(packB[i])) {
				common.add(packB[i]);
			}
		}
		for (let i = 0; i < packC.length; i++) {
			if (common.has(packC[i])) {
				total += getPrio(packC[i]);
				break;
			}
		}
	}

	return total;
}
