import { parseInput, performOperations } from './part1.ts';

const main = (input: string, w: number, h: number): string => {
	const opList = parseInput(input);
	const active = performOperations(opList, w, h);

	const screen: string[] = [];
	for (let i = 0; i < h; i++) {
		const row: string[] = [];
		for (let j = 0; j < w; j++) {
			const loc = [j, i].join('_');
			active.has(loc) ? row.push('X') : row.push('_');
		}
		screen.push(row.join(''));
	}

	return screen.join('\n').trim();
};

export default function (
	input: string,
	title: string,
	w: number,
	h: number,
): string {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input, w, h);
	console.timeEnd('Time elapsed');
	return result;
}
