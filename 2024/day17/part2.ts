import { Computer, parseInput, runProg } from './part1.ts';

const findA = (nextA: bigint, i: number, comp: Computer): bigint => {
	if (i < 0) return nextA;
	for (let curA = nextA << 3n; curA < (nextA << 3n) + 8n; curA++) {
		comp.a = curA;
		comp.b = 0n;
		comp.c = 0n;
		comp.ptr = 0;
		comp.out = [];
		runProg(comp, comp.prog.length);
		if (comp.out[0] === comp.prog[i]) {
			const final = findA(curA, i - 1, comp);
			if (final >= 0n) return final;
		}
	}
	return -1n;
};

const main = (input: string): number => {
	const comp = parseInput(input);
	return Number(findA(0n, comp.prog.length - 1, comp));
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
