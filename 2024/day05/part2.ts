import { parseInput, Rule, testPage } from './part1.ts';

const fixPage = (rules: Rule[], page: number[]): number[] => {
	for (const rule of rules) {
		let fX = -1;
		let fY = -1;
		for (let i = 0; i < page.length; i++) {
			if (rule.x === page[i]) fX = i;
			if (rule.y === page[i]) fY = i;

			if (fX > fY && fY > -1) {
				const fixedPage = [...page];
				fixedPage[fX] = page[fY];
				fixedPage[fY] = page[fX];
				return fixPage(rules, fixedPage);
			}
		}
	}

	return page;
};

const main = (input: string): number => {
	const printQueue = parseInput(input);
	let count = 0;
	for (const page of printQueue.pages) {
		if (testPage(printQueue.rules, page) === 0) {
			const newPage = fixPage(printQueue.rules, page);
			const mid = Math.floor(newPage.length / 2);
			count += newPage[mid];
		}
	}
	return count;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
