import { calculateHash, parseInput } from './partA.js';

const setupLenses = (labels: string[]): number => {
	const boxes = new Map<number, string[][]>();
	for (const label of labels) {
		const [lensId, strength] = label.split('-')[0].split('=');
		const box = calculateHash(lensId);

		if (strength === undefined) {
			if (boxes.has(box))
				boxes.set(
					box,
					boxes.get(box)!.filter((cur) => cur[0] !== lensId),
				);
			continue;
		}

		if (boxes.has(box)) {
			const curBox = boxes.get(box);
			const loc = curBox!.findIndex((cur) => cur[0] === lensId);
			loc >= 0
				? (curBox![loc] = [lensId, strength])
				: curBox?.push([lensId, strength]);
		} else {
			boxes.set(box, [[lensId, strength]]);
		}
	}

	let focusPower = 0;
	boxes.forEach((boxContent, boxId) => {
		boxContent.forEach((lens, lensIdx) => {
			focusPower += (boxId + 1) * (lensIdx + 1) * +lens[1];
		});
	});

	return focusPower;
};

const main = (input: string): number => {
	const initSequence = parseInput(input);
	return setupLenses(initSequence);
};

export default function (input: string): number {
	console.log('\nDay 15: Title\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
