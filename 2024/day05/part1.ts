export type Rule = {
	x: number;
	y: number;
};

export type PrintQueue = {
	rules: Rule[];
	pages: number[][];
};

export const parseInput = (input: string): PrintQueue => {
	const [rawRules, rawPages] = input.trimEnd().split('\n\n');
	const rules: Rule[] = rawRules.split('\n').reduce((acc, cur) => {
		const [x, y] = cur.split('|').map(Number);
		acc.push({ x, y } as Rule);
		return acc;
	}, [] as Rule[]);
	const pages: number[][] = rawPages
		.split('\n')
		.map((e) => e.split(',').map(Number));
	return { rules, pages };
};

export const testPage = (rules: Rule[], page: number[]): number => {
	for (const rule of rules) {
		let fX = -1;
		let fY = -1;
		for (let i = 0; i < page.length; i++) {
			if (rule.x === page[i]) fX = i;
			if (rule.y === page[i]) fY = i;

			if (fX > fY && fY > -1) return 0;
		}
	}

	const mid = Math.floor(page.length / 2);
	return page[mid];
};

const main = (input: string): number => {
	const printQueue = parseInput(input);
	let count = 0;
	for (const page of printQueue.pages) {
		count += testPage(printQueue.rules, page);
	}
	return count;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
