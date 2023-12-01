export const dirs = {
	'^': [-1, 0],
	v: [1, 0],
	'<': [0, -1],
	'>': [0, 1],
} as { [key: string]: number[] };

const main = (input: string): number => {
	const visited = new Set().add('0,0');
	let x = 0,
		y = 0;
	for (const dir of input) {
		x += dirs[dir][0];
		y += dirs[dir][1];
		visited.add([x, y].join(','));
	}
	return visited.size;
};

export default function (input: string): number {
	console.log('\nDay 03: Perfectly Spherical Houses in a Vacuum\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
