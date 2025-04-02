export const parseInput = (input: string): number[][] => {
	return input
		.trimEnd()
		.split('\n')
		.map((cur) => [...cur.matchAll(/\d+/g)].map(Number));
};

const countTriangles = (maybes: number[][]): number => {
	let count = 0;

	for (const tri of maybes) {
		const [a, b, c] = tri.sort((a, b) => a - b);
		if (a + b > c) count++;
	}

	return count;
};

const main = (input: string): number => {
	const maybeTriangles = parseInput(input);
	return countTriangles(maybeTriangles);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
