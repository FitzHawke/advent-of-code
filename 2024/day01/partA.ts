export const parseInput = (input: string): { l1: number[]; l2: number[] } => {
	const l1: number[] = [];
	const l2: number[] = [];

	input
		.trim()
		.split('\n')
		.map((e) =>
			e.split('   ').map((n, i) => (i === 0 ? l1.push(+n) : l2.push(+n))),
		);

	l1.sort();
	l2.sort();

	return { l1, l2 };
};

const main = (input: string): number => {
	const lists = parseInput(input);
	let count = 0;

	for (let i = 0; i < lists.l1.length; i++) {
		count += Math.abs(lists.l1[i] - lists.l2[i]);
	}
	return count;
};

export default function (input: string, title: string): number {
	console.log(`\nDay 01: ${title}\nPart A`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
