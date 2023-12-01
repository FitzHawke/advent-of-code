export type Cubes = {
	[key: string]: Coords;
	mins: Coords;
	maxs: Coords;
};

export type Coords = {
	x: number;
	y: number;
	z: number;
};

export const sides = [
	[1, 0, 0],
	[0, 1, 0],
	[0, 0, 1],
	[-1, 0, 0],
	[0, -1, 0],
	[0, 0, -1],
];

export const parseInput = (input: string): Cubes => {
	return input
		.trim()
		.split('\n')
		.reduce(
			(acc, c) => {
				const [x, y, z] = c.split(',').map(Number);
				acc[[x, y, z].join('-')] = { x, y, z };
				acc.mins.x = Math.min(x, acc.mins.x);
				acc.mins.y = Math.min(y, acc.mins.y);
				acc.mins.z = Math.min(z, acc.mins.z);
				acc.maxs.x = Math.max(x, acc.maxs.x);
				acc.maxs.y = Math.max(y, acc.maxs.y);
				acc.maxs.z = Math.max(z, acc.maxs.z);
				return acc;
			},
			{
				maxs: { x: -Infinity, y: -Infinity, z: -Infinity },
				mins: { x: Infinity, y: Infinity, z: Infinity },
			} as Cubes,
		);
};

const findSides = (cubes: Cubes): number => {
	let openSides = 0;
	for (const [key, cube] of Object.entries(cubes)) {
		if (key === 'mins' || key === 'maxs') continue;
		for (const side of sides) {
			const x = side[0] + cube.x;
			const y = side[1] + cube.y;
			const z = side[2] + cube.z;
			const xyz = [x, y, z].join('-');
			if (!cubes[xyz]) {
				openSides++;
			}
		}
	}
	return openSides;
};

const main = (input: string): number => {
	const cubes = parseInput(input);
	const opensides = findSides(cubes);
	return opensides;
};

export default function (input: string): number {
	console.log('\nDay 18: Boiling Boulders\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
