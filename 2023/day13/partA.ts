export type Mirror = {
	columns: number[][];
	rows: number[][];
};

export const parseInput = (input: string): Mirror[] => {
	const mirrors = input.split('\n\n').map((curMirror) => {
		const rows = curMirror
			.split('\n')
			.map((curRow) => curRow.split('').map((cur) => (cur === '#' ? 1 : 0)));
		const cols: number[][] = [];
		for (let i = 0; i < rows[0].length; i++) {
			if (cols.length <= i) cols.push([]);
			for (let j = 0; j < rows.length; j++) {
				cols[i].push(rows[j][i]);
			}
		}
		return { columns: cols, rows: rows };
	});

	return mirrors;
};

export const testReflection = (
	testSubject: number[][],
	idx: number,
	acceptableFailures: number = 0,
): boolean => {
	let fails = 0;
	let l = idx - 1,
		r = idx;
	while (fails <= acceptableFailures && l >= 0 && r < testSubject.length) {
		if (testSubject[l].join('') !== testSubject[r].join('')) {
			if (fails + 1 > acceptableFailures) {
				fails++;
				break;
			}
			for (let i = 0; i < testSubject[l].length; i++) {
				if (testSubject[l][i] !== testSubject[r][i]) fails++;
			}
		}

		l--;
		r++;
	}
	return fails === acceptableFailures;
};

export const calculateValue = (currentMirror: Mirror, fails:number = 0): number => {
	let patternValue = 0;

	for (let i = 1; i < currentMirror.columns.length; i++) {
		if (testReflection(currentMirror.columns, i, fails)) {
			patternValue += i;
			break;
		}
	}

	if (patternValue > 0) return patternValue;

	for (let i = 1; i < currentMirror.rows.length; i++) {
		if (testReflection(currentMirror.rows, i, fails)) {
			patternValue += i * 100;
			break;
		}
	}

	return patternValue;
};

const main = (input: string): number => {
	const mirrors = parseInput(input);
	return mirrors.reduce((acc, cur) => (acc += calculateValue(cur)), 0);
};

export default function (input: string): number {
	console.log('\nDay 13: Point of Incidence\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
