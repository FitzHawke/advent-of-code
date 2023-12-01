type Coord = [number, number];
type Tower = Set<string>;

const rocks: Coord[][] = [
	// from bottom left corner @ 0,0
	[
		[0, 0],
		[1, 0],
		[2, 0],
		[3, 0],
	], // horizontal line
	[
		[0, 1],
		[1, 0],
		[1, 1],
		[1, 2],
		[2, 1],
	], // + shape
	[
		[0, 0],
		[1, 0],
		[2, 0],
		[2, 1],
		[2, 2],
	], // backwards L shape
	[
		[0, 0],
		[0, 1],
		[0, 2],
		[0, 3],
	], // vertical line
	[
		[0, 0],
		[0, 1],
		[1, 0],
		[1, 1],
	], // square
];

const getWidth = (rock: Coord[]): number => {
	let width = 0;
	for (const loc of rock) {
		width = Math.max(width, loc[0]);
	}
	return width; // 0 if 1 block wide
};

const checkCollision = (
	tower: Tower,
	rock: Coord[],
	left: number,
	bottom: number,
	width: number,
): boolean => {
	if (bottom < 1) return true;
	if (left < 0) return true;
	if (left + width >= 7) return true;
	for (const loc of rock) {
		if (tower.has([loc[0] + left, loc[1] + bottom].join('-'))) return true;
	}
	return false;
};

const main = (input: string, rockDrops: number): number => {
	const wind = input.trim();
	let direction = 0,
		newRock = 0;
	const tower = new Set() as Tower;
	let count = 0,
		height = 0;

	while (count < rockDrops) {
		const rock = rocks[newRock];
		const width = getWidth(rock);
		let rockLoc: Coord = [2, height + 4];
		let moving = true;
		while (moving) {
			let moveDir = 0;

			if (wind[direction] === '>') moveDir = 1;
			else moveDir = -1;

			if (!checkCollision(tower, rock, rockLoc[0] + moveDir, rockLoc[1], width))
				rockLoc[0] += moveDir;

			direction = (direction + 1) % wind.length;

			if (checkCollision(tower, rock, rockLoc[0], rockLoc[1] - 1, width)) {
				moving = false;
				for (const loc of rock) {
					tower.add([loc[0] + rockLoc[0], loc[1] + rockLoc[1]].join('-'));
					height = Math.max(height, loc[1] + rockLoc[1]);
				}
			} else {
				rockLoc[1] -= 1;
			}
		}
		newRock = (newRock + 1) % rocks.length;
		count += 1;
	}

	return height;
};

export default function (input: string, rockDrops: number): number {
	console.log('\nDay 17: Pyroclastic Flow\nPart A');
	const startTime = new Date();
	const result = main(input, rockDrops);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
