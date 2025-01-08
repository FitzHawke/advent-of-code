export const parseInput = (input: string): number[] => {
	return input
		.trimEnd()
		.split(' ')
		.map(Number);
};

export const countStones = (stones: number[], blinks: number): number => {
	const cache = new Map<string, number>();
	let count = 0;

	const blink = (value: number, blinkNo: number): number => {
		const label = [value, blinkNo].join('_');
		if (cache.has(label)) return cache.get(label);
		if (blinkNo >= blinks) return 1;
		let curCount = 0;

		if (value === 0) {
			curCount = blink(1, blinkNo + 1);
		} else if (String(value).length % 2 === 0) {
			const stoneStr = String(value);
			const l = Number(stoneStr.substring(0, stoneStr.length / 2));
			const r = Number(stoneStr.substring(stoneStr.length / 2));
			curCount = blink(l, blinkNo + 1) + blink(r, blinkNo + 1);
		} else {
			curCount = blink(value * 2024, blinkNo + 1);
		}

		cache.set(label, curCount);
		return curCount;
	};

	for (const stone of stones) {
		count += blink(stone, 0);
	}

	return count;
};

const main = (input: string): number => {
	return countStones(parseInput(input), 25);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
