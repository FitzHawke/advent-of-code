const conversion = {
	'2': 2,
	'1': 1,
	'0': 0,
	'-': -1,
	'=': -2,
} as { [key: string]: number };

const parseInputs = (input: string): number[][] => {
	return input.split('\n').map((line) => {
		const lineArr: number[] = [];
		for (let i = 0; i < line.length; i++) {
			lineArr.push(conversion[line[i]]);
		}
		return lineArr;
	});
};

const findBase10Val = (vals: number[]): number => {
	let result = 0;
	for (let i = vals.length - 1; i >= 0; i--) {
		result += vals[i] * 5 ** (vals.length - i - 1);
	}
	return result;
};

const calcFuelSum = (fuelVals: number[][]): number => {
	return fuelVals.reduce((acc, c) => acc + findBase10Val(c), 0);
};

const findSNAFUVal = (val: number): string => {
	const revConv = new Map()
		.set(0, '0')
		.set(1, '1')
		.set(2, '2')
		.set(3, '=')
		.set(4, '-');
	if (val === 0) return '';
	for (let i = 0; i < 5; i++) {
		if (val % 5 === i) {
			const snafuNum = revConv.get(i);
			return findSNAFUVal((val - conversion[snafuNum]) / 5) + snafuNum;
		}
	}
	return '';
};

const main = (input: string): string => {
	const fuelVals = parseInputs(input);
	const fuelSum = calcFuelSum(fuelVals);
	return findSNAFUVal(fuelSum);
};

export default function (input: string): string {
	console.log('\nDay 25: Title\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
