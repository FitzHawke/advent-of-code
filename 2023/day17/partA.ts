export const jn = (char: string, ...args: (string | number)[]): string => {
	return args.join(char);
};

export const directions = new Map<string, number[]>()
	.set('u', [-1, 0])
	.set('d', [1, 0])
	.set('l', [0, -1])
	.set('r', [0, 1]);

export const parseInput = (input: string): number[][] => {
	return input.split('\n').map((cur) => cur.split('').map(Number));
};

export const findBestPath = (
	lossMap: number[][],
	moveFunc: (
		lossMap: number[][],
		r: number,
		c: number,
		dir: string,
	) => [number, number, number, string][],
): number => {
	const seen = new Map<string, number>();

	const queue: string[] = ['0_0_r-0', '0_0_d-0'];
	let prev = 0;

	while (queue.length) {
		const [id, curVal] = queue.shift()!.split('-');
		const [r, c, dir] = id.split('_');
		if (+curVal !== prev) {
			queue.sort((a,b)=>+a.split('-')[1]-+b.split('-')[1])
			queue.splice(5000)
			prev = +curVal
		}

		moveFunc(lossMap, +r, +c, dir).forEach(
			(cur) => {
				const newVal = +curVal + cur[2]
				const newId = jn('_', cur[0], cur[1], cur[3]);
				if (seen.has(newId) && seen.get(newId)! <= +newVal) return;
				seen.set(newId, newVal);
				queue.push(jn('-', newId, newVal));
			},
		);
	}

	const min = Math.min(
		...['d', 'r'].map((dir) => {
			const id = jn('_', lossMap.length - 1, lossMap[0].length - 1, dir)
			return seen.get(id)!;
		}),
	);

	return min;
};

const main = (input: string): number => {
	const lossMap = parseInput(input);
	const moveFunc = (
		lossMap: number[][],
		r: number,
		c: number,
		dir: string,
	) => {
		const newPositions: [number, number, number, string][] = [];
		let val = 0;
		for (let i = 1; i <= 3; i++) {
			const r2 = r + i * directions.get(dir)![0];
			const c2 = c + i * directions.get(dir)![1];
			if (r2 < 0 || c2 < 0 || r2 >= lossMap.length || c2 >= lossMap[0].length)
				break;
			val += lossMap[r2][c2]
			if (dir === 'u' || dir === 'd') {
				newPositions.push([r2, c2, val, 'l'], [r2, c2, val, 'r']);
			} else {
				newPositions.push([r2, c2, val, 'u'], [r2, c2, val, 'd']);
			}
		}
		return newPositions;
	};
	return findBestPath(lossMap, moveFunc);
};

export default function (input: string): number {
	console.log('\nDay 17: Clumsy Crucible\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
