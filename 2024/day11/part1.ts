type StoneRound = [number, number];

export const parseInput = (input: string): StoneRound[] => {
	return input
		.trimEnd()
		.split(' ')
		.map((s) => [Number(s), 0] as StoneRound);
};

export const blink = (stones: StoneRound[], blinks: number): number => {
	const remainingStones = [...stones];
	let count = 0;

	while (remainingStones.length > 0) {
		const curStone = remainingStones.pop();

		if (curStone[1] === blinks) {
			count++;
			continue;
		}

		const blinkNum = curStone[1] + 1;

		if (curStone[0] === 0) {
			remainingStones.push([1, blinkNum]);
			continue;
		}

		if (String(curStone[0]).length%2===0) {
			const stoneStr = String(curStone[0])
			const l = Number(stoneStr.substring(0,stoneStr.length/2))
			const r = Number(stoneStr.substring(stoneStr.length/2))
			remainingStones.push([l,blinkNum],[r,blinkNum])
			continue;
		}

		remainingStones.push([curStone[0]*2024,blinkNum])
	}

	return count;
};

const main = (input: string): number => {
	return blink(parseInput(input), 25);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
