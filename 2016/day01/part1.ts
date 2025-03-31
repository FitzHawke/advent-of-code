export type Walk = [string, number];

export const parseInput = (input: string): Walk[] => {
	return input
		.trimEnd()
		.split(', ')
		.map((cur) => {
			const dir = cur.slice(0, 1);
			const dist = Number(cur.slice(1));
			return [dir, dist];
		});
};

const findDistance = (directions: Walk[]): number => {
	let idx = 0;
	const dirMod = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	];
	let dist = [0, 0];
	const turn = new Map().set('L', -1).set('R', 1);

	for (const dir of directions) {
		idx = (4 + idx + turn.get(dir[0])) % 4;
		dist[0] += dirMod[idx][0] * dir[1];
		dist[1] += dirMod[idx][1] * dir[1];
	}

	return Math.abs(dist[0]) + Math.abs(dist[1]);
};

const main = (input: string): number => {
	const directions = parseInput(input);
	return findDistance(directions);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
