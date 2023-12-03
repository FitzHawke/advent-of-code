import { parseInput, schematic } from './partA.js';

const findNumber = (schema: schematic, loc: string): number => {
	let [y, x] = loc.split('-').map(Number);
	let foundStart = false;

	while (!foundStart) {
		if (x > 0 && !isNaN(+schema.get([y, x - 1].join('-'))!)) x -= 1;
		else foundStart = true;
	}

	const partialNum: string[] = [];
	let foundEnd = false;

	while (!foundEnd) {
		if (!isNaN(+schema.get([y, x].join('-'))!)) {
			partialNum.push(schema.get([y, x].join('-'))!);
		} else foundEnd = true;
		x += 1;
	}

	return Number(partialNum.join(''));
};

const findGearRatios = (schema: schematic): number => {
	let gearSum = 0;

	for (const [loc, point] of schema) {
		if (point === '*') {
			const [y, x] = loc.split('-').map(Number);
			const parts: number[] = [];

			if (!isNaN(+schema.get([y - 1, x].join('-'))!)) {
				parts.push(findNumber(schema, [y - 1, x].join('-')));
			} else {
				for (const a of [-1, 1]) {
					if (!isNaN(+schema.get([y - 1, x + a].join('-'))!)) {
						parts.push(findNumber(schema, [y - 1, x + a].join('-')));
					}
				}
			}

			if (!isNaN(+schema.get([y + 1, x].join('-'))!)) {
				parts.push(findNumber(schema, [y + 1, x].join('-')));
			} else {
				for (const a of [-1, 1]) {
					if (!isNaN(+schema.get([y + 1, x + a].join('-'))!)) {
						parts.push(findNumber(schema, [y + 1, x + a].join('-')));
					}
				}
			}

			for (const a of [-1, 1]) {
				if (!isNaN(+schema.get([y, x + a].join('-'))!)) {
					parts.push(findNumber(schema, [y, x + a].join('-')));
				}
			}

			if (parts.length === 2) gearSum += parts[0] * parts[1];
		}
	}
	return gearSum;
};

const main = (input: string): number => {
	const schema = parseInput(input);
	return findGearRatios(schema.schema);
};

export default function (input: string): number {
	console.log('\nDay 03: Title\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
