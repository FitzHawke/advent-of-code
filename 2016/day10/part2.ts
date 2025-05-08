import { BotMap, parseInput } from './part1.ts';

const findOutputs = (bots: BotMap): number => {
	const stack: number[] = [];

	// this is already a mess, so why not
	let output0: number = null;
	let output1: number = null;
	let output2: number = null;

	bots.forEach((val, key) => {
		if (val.holding.length >= 2) stack.push(key);
	});

	while (stack.length) {
		const curNum = stack.shift();
		const curBot = bots.get(curNum);
		curBot.holding.sort((a, b) => a - b);

		if (output0 && output1 && output2) {
			return output0 * output1 * output2;
		}

		let curVal = curBot.holding.pop();
		if (curBot.high.dest === 'bot') {
			const highBot = bots.get(curBot.high.num);
			highBot.holding.push(curVal);
			if (highBot.holding.length >= 2) stack.push(curBot.high.num);
		} else {
			const num = curBot.high.num;
			if (num === 0) output0 = curVal;
			if (num === 1) output1 = curVal;
			if (num === 2) output2 = curVal;
		}

		curVal = curBot.holding.pop();
		if (curBot.low.dest === 'bot') {
			const lowBot = bots.get(curBot.low.num);
			lowBot.holding.push(curVal);
			if (lowBot.holding.length >= 2) stack.push(curBot.low.num);
		} else {
			const num = curBot.low.num;
			if (num === 0) output0 = curVal;
			if (num === 1) output1 = curVal;
			if (num === 2) output2 = curVal;
		}
	}

	return -1;
};

const main = (input: string): number => {
	const bots = parseInput(input);
	return findOutputs(bots);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
