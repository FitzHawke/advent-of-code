export const directions = new Map()
	.set('U', [0, -1])
	.set('D', [0, 1])
	.set('L', [-1, 0])
	.set('R', [1, 0]);

export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

const calcPassCode = (digitMoves: string[]): number => {
	const code: string[] = [];
	const keypadLoc = [1, 1];
	const keypad = [
		['1', '2', '3'],
		['4', '5', '6'],
		['7', '8', '9'],
	];

	for (const moves of digitMoves) {
		for (const move of moves) {
			const dir = directions.get(move) || [0, 0];
			if (keypadLoc[0] + dir[0] < 0 || keypadLoc[0] + dir[0] > 2) continue;
			if (keypadLoc[1] + dir[1] < 0 || keypadLoc[1] + dir[1] > 2) continue;
			keypadLoc[0] += dir[0];
			keypadLoc[1] += dir[1];
		}
		code.push(keypad[keypadLoc[1]][keypadLoc[0]]);
	}

	return Number(code.join(''));
};

const main = (input: string): number => {
	const directions = parseInput(input);
	return calcPassCode(directions);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
