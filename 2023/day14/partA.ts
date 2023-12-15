// [row traversal, column traversal, operation start(0=beginning,1=end)]
// essentially we sit at one end and pull the rocks to us in order to avoid collisions

export const directions = {
	north: [-1, 0, 0],
	west: [0, -1, 0],
	south: [1, 0, 1],
	east: [0, 1, 1],
};

export const parseInput = (input: string): string[][] => {
	const platform: string[][] = [];
	input.split('\n').forEach((curRow, rowIdx) => {
		platform.push([]);
		curRow.split('').forEach((curPt) => platform[rowIdx].push(curPt));
	});

	return platform;
};

export const tiltPlatform = (directions: number[][], repetitions: number) => {
	const memoPlatform = new Map<string, string>();
	const moveBoulder = (
		plat: string[][],
		r: number,
		c: number,
		d: number[],
	): void => {
		let newR = r;
		let newC = c;
		while (true) {
			const testR = newR + d[0];
			const testC = newC + d[1];
			if (
				testR < 0 ||
				testR >= plat.length ||
				testC < 0 ||
				testC >= plat[0].length ||
				plat[testR][testC] !== '.'
			)
				break;
			newR = testR;
			newC = testC;
		}
		plat[r][c] = '.';
		plat[newR][newC] = 'O';
	};

	return (platform: string[][]): string[][] => {
		let newPlat = structuredClone(platform);
		let cycling = false;
		let cycleId = '';
		let cycleStart = '';
		let cycleLen = 0;

		for (let i = 1; i <= repetitions; i++) {
			if (cycling) {
				cycleLen++;
				if (cycleId === cycleStart) {
					i = Math.floor((repetitions - i) / cycleLen) * cycleLen + i;
					cycleStart = 'x'
				}
				cycleId = memoPlatform.get(cycleId)!;
				continue;
			}

			const platId = newPlat.map((cur) => cur.join('-')).join('--');
			if (memoPlatform.has(platId)) {
				cycleId = memoPlatform.get(platId)!;
				cycleStart = platId;
				cycling = true;
				continue;
			}

			for (const dir of directions) {
				// unnecessarily confusing loops. but was fun to write :)
				const startR = (newPlat.length - 1) * dir[2];
				const endR = (newPlat.length - 1) * (1 - dir[2]);
				const startC = (newPlat[0].length - 1) * dir[2];
				const endC = (newPlat[0].length - 1) * (1 - dir[2]);
				const itrR = Math.sign(endR - startR);
				const itrC = Math.sign(endC - startC);

				for (let j = startR; j !== endR+itrR; j += itrR) {
					for (let k = startC; k !== endC+itrC; k += itrC) {
						if (newPlat[j][k] === 'O')
							moveBoulder(newPlat, j, k, [dir[0], dir[1]]);
					}
				}
			}
			const newPlatId = newPlat.map((cur) => cur.join('-')).join('--');
			memoPlatform.set(platId,newPlatId);
		}
		return cycleId === '' ? newPlat : cycleId.split('--').map(cur=>cur.split('-'));
	};
};

export const findWeight = (platform: string[][]): number => {
	return structuredClone(platform)
		.reverse()
		.reduce((acc, cur, idx) => {
			let count = 0;
			for (const loc of cur) {
				if (loc === 'O') count += idx + 1;
			}
			return acc + count;
		}, 0);
};

const main = (input: string): number => {
	const platform = parseInput(input);
	const tilt = tiltPlatform([directions.north], 1);
	return findWeight(tilt(platform));
};

export default function (input: string): number {
	console.log('\nDay 14: Parabolic Reflector Dish\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
