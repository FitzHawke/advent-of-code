import { parseInput, testDesign } from './part1.ts';

const main = (input: string): number => {
	const cache = new Map<string, number>();
	const towelDesigns = parseInput(input);
	return towelDesigns.designs.reduce(
		(a, c) =>
			a + testDesign(c, towelDesigns.styles, towelDesigns.mostStripes, cache),
		0,
	);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
