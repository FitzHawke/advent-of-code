export type Monkey = {
	value: number;
	monkey1: string;
	monkey2: string;
	sign: string;
	hasHuman: boolean;
};
export type Monkeys = Map<string, Monkey>;

export const parseMonkeys = (input: string): Monkeys => {
	const monkeys = new Map() as Monkeys;
	input
		.trim()
		.split('\n')
		.forEach((line) => {
			const mon = {
				value: NaN,
				monkey1: '',
				monkey2: '',
				sign: 'x',
				hasHuman: false,
			} as Monkey;
			const [id, math] = line.split(': ');
			const val = math.split(' ');
			if (val.length === 1) {
				mon.value = Number(val[0]);
			} else {
				mon.monkey1 = val[0];
				mon.monkey2 = val[2];
				mon.sign = val[1];
			}
			if (id === 'humn') mon.hasHuman = true;
			monkeys.set(id, mon);
		});
	return monkeys;
};

export const mathHelper = (
	val1: number,
	val2: number,
	sign: string,
): number => {
	if (sign === '+') return val1 + val2;
	else if (sign === '-') return val1 - val2;
	else if (sign === '*') return val1 * val2;
	else if (sign === '/') return val1 / val2;
	return 0;
};

export const doMonkeyMath = (monkeys: Monkeys): void => {
	const stack = ['root'];
	while (stack.length >= 1) {
		const cur = stack.pop();
		const curMonkey = monkeys.get(cur!);
		if (cur && curMonkey && isNaN(curMonkey.value)) {
			stack.push(cur);
			const monkey1 = monkeys.get(curMonkey.monkey1);
			const monkey2 = monkeys.get(curMonkey.monkey2);
			if (monkey1 && isNaN(monkey1.value)) {
				stack.push(curMonkey.monkey1);
			}
			if (monkey2 && isNaN(monkey2.value)) {
				stack.push(curMonkey.monkey2);
			}
			if (
				monkey1 &&
				monkey2 &&
				!isNaN(monkey1.value) &&
				!isNaN(monkey2.value)
			) {
				curMonkey.value = mathHelper(
					monkey1.value,
					monkey2.value,
					curMonkey.sign,
				);
				if (monkey1.hasHuman) curMonkey.hasHuman = true;
				if (monkey2.hasHuman) curMonkey.hasHuman = true;
			}
		}
	}
};

const main = (input: string): number => {
	const monkeys = parseMonkeys(input);
	doMonkeyMath(monkeys);
	const rootVal = monkeys.get('root')!.value;
	return rootVal;
};

export default function (input: string): number {
	console.log('\nDay 21: Monkey Math\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
