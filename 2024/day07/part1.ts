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

export const testEquation = (eqn: Equation, part: 1 | 2): boolean => {
	const testEqns: Equation[] = [eqn];

	while (testEqns.length > 0) {
		const cur = testEqns.shift();
		if (cur.values.length === 1 && cur.values[0] === cur.ans) return true;
		if (cur.values.length === 1) continue;
		const lastVal = cur.values.at(-1);

		if (cur.ans % lastVal === 0)
			testEqns.push({
				ans: cur.ans / lastVal,
				values: cur.values.slice(0, -1),
			});

		if (part === 2) {
			const ansStr = String(cur.ans);
			const valStr = String(lastVal);
			if (ansStr.endsWith(valStr)) {
				const newAns = Number(ansStr.slice(0, ansStr.length - valStr.length));
				testEqns.push({ ans: newAns, values: cur.values.slice(0, -1) });
			}
		}

		if (cur.ans - lastVal > 0) testEqns.push({ ans: cur.ans - lastVal, values: cur.values.slice(0, -1) })
	}
	return false;
};

const main = (input: string): number => {
	const eqns = parseInput(input);
	let counter = 0;
	for (const eqn of eqns) {
		if (testEquation(eqn, 1)) counter += eqn.ans;
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
