export const directions = new Map()
	.set('L', [0, -1])
	.set('R', [0, 1])
	.set('U', [-1, 0])
	.set('D', [1, 0]);

export const parseInput = (input: string): string[] => {
	return input.trimEnd().split('\n');
};

export const calcPassCode = (
	digitMoves: string[],
	keypad: string[][],
	initialLoc: number[],
): string => {
	const code: string[] = [];
	const keypadLoc = initialLoc;

	for (const moves of digitMoves) {
		for (const move of moves) {
			const dir = directions.get(move) || [0, 0];
			let [r, c] = keypadLoc;
			r += dir[0];
			c += dir[1];
			if (keypad[r][c] === 'X') continue;
			keypadLoc[0] = r;
			keypadLoc[1] = c;
		}
		code.push(keypad[keypadLoc[0]][keypadLoc[1]]);
	}

	return code.join('');
};

const main = (input: string): string => {
	const directions = parseInput(input);
	const keypad = [
		['X', 'X', 'X', 'X', 'X'],
		['X', '1', '2', '3', 'X'],
		['X', '4', '5', '6', 'X'],
		['X', '7', '8', '9', 'X'],
		['X', 'X', 'X', 'X', 'X'],
	];
	return calcPassCode(directions, keypad, [2, 2]);
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
