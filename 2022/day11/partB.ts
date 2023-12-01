type monkey = {
	items: number[];
	op: 'p' | 't' | 'e';
	opNum: number;
	test: number;
	true: number;
	false: number;
	touched: number;
};

const parser = (input: string): monkey[] => {
	return input.split('\n\n').map((monkeyList) => {
		return monkeyList.split('\n').reduce((acc, line): monkey => {
			const l = line.split(': ');
			if (l[0].trim().startsWith('S')) {
				acc.items = l[1].split(', ').map(Number);
			} else if (l[0].trim().startsWith('O')) {
				const [_, oper, num] = l[1].split(' = ')[1].split(' ');
				if (num === 'old') {
					acc.op = 'e';
					acc.opNum = 2;
				} else if (oper === '*') {
					acc.op = 't';
					acc.opNum = Number(num);
				} else {
					acc.op = 'p';
					acc.opNum = Number(num);
				}
			} else if (l[0].trim().startsWith('T')) {
				acc.test = Number(l[1].split(' ').at(-1));
			} else if (l[0].split(' ').at(-1) === 'true') {
				acc.true = Number(l[1].split(' ').at(-1));
			} else if (l[0].split(' ').at(-1) === 'false') {
				acc.false = Number(l[1].split(' ').at(-1));
				acc.touched = 0;
			}

			return acc;
		}, {} as monkey);
	});
};

const operation = (
	old: number,
	op: string,
	num: number,
	div: number,
): number => {
	let val = 0;
	if (op === 'e') val = old * old;
	else if (op === 't') val = old * num;
	else if (op === 'p') val = old + num;
	return val % div;
};

const divisor = (monkeys: monkey[]): number => {
	let div = 1;
	for (const mon of monkeys) {
		div *= mon.test;
	}
	return div;
};

export default function (input: string): number {
	const monkeys = parser(input);
	const div = divisor(monkeys);
	for (let i = 0; i < 10000; i++) {
		for (let m = 0; m < monkeys.length; m++) {
			const mon = monkeys[m];
			for (const item of mon.items) {
				mon.touched += 1;
				const val = operation(Number(item), mon.op, mon.opNum, div);
				val % mon.test === 0
					? monkeys[mon.true].items.push(val)
					: monkeys[mon.false].items.push(val);
			}
			mon.items = [];
		}
	}
	const touched: number[] = [];
	for (const mon of monkeys) {
		touched.push(mon.touched);
	}
	touched.sort((a, b) => b - a);
	return touched[0] * touched[1];
}
