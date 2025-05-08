type PointerType = {
	num: number;
	dest: string;
};

type BotType = {
	holding?: number[];
	low?: PointerType;
	high?: PointerType;
};

export type BotMap = Map<number, BotType>;

export const parseInput = (input: string): BotMap => {
	const bots: BotMap = new Map();
	input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			if (cur.startsWith('value')) {
				const [, val, , , , bot] = cur.split(' ').map(Number);
				bots.has(bot)
					? bots.get(bot).holding.push(Number(val))
					: bots.set(bot, { holding: [Number(val)] });
			} else {
				const [, botStr, , , , destLow, numLow, , , , destHigh, numHigh] =
					cur.split(' ');
				const bot = Number(botStr);
				const low = { num: Number(numLow), dest: destLow };
				const high = { num: Number(numHigh), dest: destHigh };
				if (bots.has(bot)) {
					bots.get(bot).low = low;
					bots.get(bot).high = high;
				} else {
					bots.set(bot, { holding: [], low, high });
				}
			}
		});
	return bots;
};

const findSpecificBot = (bots: BotMap, num1: number, num2: number): number => {
	const stack: number[] = [];
	bots.forEach((val, key) => {
		if (val.holding.length >= 2) stack.push(key);
	});
	const nums = [num1, num2].sort((a, b) => a - b);

	while (stack.length) {
		const curNum = stack.shift();
		const curBot = bots.get(curNum);
		curBot.holding.sort((a, b) => a - b);

		if (curBot.holding[0] === nums[0] && curBot.holding[1] === nums[1]) {
			return curNum;
		}

		if (curBot.high.dest === 'bot') {
			const highBot = bots.get(curBot.high.num);
			highBot.holding.push(curBot.holding.pop());
			if (highBot.holding.length >= 2) stack.push(curBot.high.num);
		} else curBot.holding.pop();

		if (curBot.low.dest === 'bot') {
			const lowBot = bots.get(curBot.low.num);
			lowBot.holding.push(curBot.holding.pop());
			if (lowBot.holding.length >= 2) stack.push(curBot.low.num);
		} else curBot.holding.pop();
	}

	return -1;
};

const main = (input: string, num1: number, num2: number): number => {
	const bots = parseInput(input);
	return findSpecificBot(bots, num1, num2);
};

export default function (
	input: string,
	title: string,
	num1: number,
	num2: number,
): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, num1, num2);
	console.timeEnd('Time elapsed');
	return result;
}
