export type fullSchematic = {
	schema: schematic;
	width: number;
	height: number;
};
export type schematic = Map<string, string>;
export const directions = [
	[1, -1],
	[0, -1],
	[-1, -1],
	[1, 0],
	[-1, 0],
	[1, 1],
	[0, 1],
	[-1, 1],
];

export const parseInput = (input: string): fullSchematic => {
	const schema = new Map() as schematic;
	let width = 0,
		height = 0;
	input.split('\n').map((curRow, i, arr) => {
		if (width < curRow.length) (width = curRow.length), (height = arr.length);
		curRow.split('').map((cur, j) => {
			schema.set([i, j].join('-'), cur);
		});
		schema.set([i, width].join('-'), '.');
	});
	return { schema, width, height };
};

const findPartNumbers = (schema: schematic, w: number, h: number): number => {
	let partSum = 0;
	let curNum: number[] = [];
	let adjSymbol = false;

	for (const [loc, point] of schema) {
		if (!isNaN(+point)) {
			curNum.push(+point);
			const [y, x] = loc.split('-').map(Number);
			if (!adjSymbol) {
				for (const direction of directions) {
					const newX = x + direction[0];
					const newY = y + direction[1];
					if (newX >= 0 && newX <= w && newY >= 0 && newY < h) {
						const curPoint = schema.get([newY, newX].join('-'));
						if (curPoint !== '.' && isNaN(+curPoint!)) adjSymbol = true;
					}
				}
			}
		} else {
			if (curNum.length > 0) {
				if (adjSymbol) {
					partSum += Number(curNum.join(''));
					adjSymbol = false;
				}
				curNum = [];
			}
		}
	}
	return partSum;
};

const main = (input: string): number => {
	const schema = parseInput(input);
	return findPartNumbers(schema.schema, schema.width, schema.height);
};

export default function (input: string): number {
	console.log('\nDay 03: Title\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
