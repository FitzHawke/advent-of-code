import { doMonkeyMath, mathHelper, Monkeys, parseMonkeys } from './partA';

const revMathHelper = (
	res: number,
	val: number,
	sign: string,
	isLeft: boolean,
): number => {
	if (sign === '+') return mathHelper(res, val, '-');
	else if (sign === '*') return mathHelper(res, val, '/');
	else if (sign === '-' && isLeft) return mathHelper(res, val, '+');
	else if (sign === '-' && !isLeft) return mathHelper(val, res, '-');
	else if (sign === '/' && isLeft) return mathHelper(res, val, '*');
	else if (sign === '/' && !isLeft) return mathHelper(val, res, '/');
	return 0;
};

const revMonkeyMath = (monkeys: Monkeys): number => {
	const queue = ['root'];
	let found = false;
	while (!found) {
		const curMon = monkeys.get(queue.at(-1)!);
		if (curMon) {
			const monkey1 = monkeys.get(curMon.monkey1);
			const monkey2 = monkeys.get(curMon.monkey2);
			if (monkey1 && monkey1.hasHuman) {
				if (curMon.monkey1 === 'humn') found = true;
				else queue.push(curMon.monkey1);
			}
			if (monkey2 && monkey2.hasHuman) {
				if (curMon.monkey2 === 'humn') found = true;
				else queue.push(curMon.monkey2);
			}
		}
	}

	let valNeeded = 0;
	const root = monkeys.get(queue.shift()!);
	if (root) {
		const monkey1 = monkeys.get(root.monkey1);
		const monkey2 = monkeys.get(root.monkey2);
		if (monkey1 && monkey2 && monkey1.hasHuman) valNeeded = monkey2.value;
		else if (monkey1 && monkey2 && monkey2.hasHuman) valNeeded = monkey1.value;
	}

	while (queue.length >= 1) {
		const cur = queue.shift()!;
		const curMonkey = monkeys.get(cur);
		if (curMonkey) {
			const monkey1 = monkeys.get(curMonkey.monkey1);
			const monkey2 = monkeys.get(curMonkey.monkey2);
			if (monkey1 && monkey2 && monkey1.hasHuman) {
				valNeeded = revMathHelper(
					valNeeded,
					monkey2.value,
					curMonkey.sign,
					true,
				);
			} else if (monkey1 && monkey2 && monkey2.hasHuman) {
				valNeeded = revMathHelper(
					valNeeded,
					monkey1.value,
					curMonkey.sign,
					false,
				);
			}
		}
	}
	return valNeeded;
};

const main = (input: string): number => {
	const monkeys = parseMonkeys(input);
	doMonkeyMath(monkeys);
	return revMonkeyMath(monkeys);
};

export default function (input: string): number {
	console.log('\nDay 21: Monkey Math\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
