export const parseInput = (input: string): string[][][] => {
	return input
		.split('\n')
		.map((cur) =>
			cur
				.split(' ')
				.map((lr, idx) => (idx === 0 ? lr.split('') : lr.split(','))),
		);
};

export const countPossibleArrangements = (allSprings: string[][][]): number => {
	const known = new Map<string, number>();

	const testPossible = (remaining: string[], streaks: number[]): number => {
		const id = [...remaining, '_', ...streaks].join('');
		if (known.has(id)) return known.get(id)!;
		if (streaks.length === 0) {
			if (remaining.length === 0 || remaining.every((cur) => cur !== '#')) {
				return 1;
			} else {
				return 0;
			}
		}
		const minReqSpace = streaks.reduce((acc, cur) => (acc += cur + 1), 0) - 1;
		if (remaining.length < minReqSpace) return 0;

		const currentStreak = streaks.shift()!;
		let possible = 0;
		for (let i = 0; i <= remaining.length - minReqSpace; i++) {
			let working = true;
			if (remaining[i - 1] === '#') break;
			if (remaining[i + currentStreak] === '#') working = false;
			for (let j = 0; j < currentStreak; j++) {
				const cur = remaining[i + j];
				if (cur !== '?' && cur !== '#') working = false;
			}
			if (working) {
				possible += testPossible(remaining.slice(i + currentStreak + 1), [
					...streaks,
				]);
			}
		}
		known.set(id, possible);
		return possible;
	};

	return allSprings.reduce((acc, cur) => {
		const poss = testPossible(cur[0], cur[1].map(Number));
		return (acc += poss);
	}, 0);
};

const main = (input: string): number => {
	const allSprings = parseInput(input);
	return countPossibleArrangements(allSprings);
};

export default function (input: string): number {
	console.log('\nDay 12: Title\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
