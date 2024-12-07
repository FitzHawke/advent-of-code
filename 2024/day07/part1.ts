export type Equation = {
	ans: number;
	values: number[];
};

export const parseInput = (input: string): Equation[] => {
	const eqns = input.trimEnd().split('\n');
	return eqns.map((c) => {
		const [l, r] = c.split(': ');
		return { ans: Number(l), values: r.split(' ').map(Number) };
	});
};

const testEquation = (eqn: Equation): boolean => {
	const testVals: number[][] = [eqn.values];

	while (testVals.length > 0) {
		const curVal = testVals.shift();
		if (curVal.reduce((a, b) => a + b, 0) === eqn.ans) return true;
		if (curVal.length <= 1) continue;
		const testValAdd = curVal[0]+curVal[1]
		const testValMul = curVal[0]*curVal[1]
		if (!(testValAdd > eqn.ans)) testVals.push([testValAdd, ...curVal.slice(2)])
		if (!(testValMul > eqn.ans)) testVals.push([testValMul, ...curVal.slice(2)])
	}
	return false;
};

const main = (input: string): number => {
	const eqns = parseInput(input);
	let counter = 0;
	for (const eqn of eqns) {
		if (testEquation(eqn)) counter += eqn.ans;
	}
	return counter;
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
