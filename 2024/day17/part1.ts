export type Computer = {
	a: bigint;
	b: bigint;
	c: bigint;
	prog: bigint[];
	ptr: number;
	out: bigint[];
};

export const parseInput = (input: string): Computer => {
	const [a, b, c, ...prog] = input.trimEnd().match(/\d+/g).map(BigInt);
	return { a, b, c, prog, ptr: 0, out: [] };
};

const combo = (comp: Computer): bigint =>
	[0n, 1n, 2n, 3n, comp.a, comp.b, comp.c][Number(comp.prog[comp.ptr + 1])];

const adv = (comp: Computer) => {
	comp.a = comp.a >> combo(comp);
};

const bxl = (comp: Computer) => {
	comp.b = comp.b ^ comp.prog[comp.ptr + 1];
};

const bst = (comp: Computer) => {
	comp.b = combo(comp) & 7n;
};

const bxc = (comp: Computer) => {
	comp.b = comp.b ^ comp.c;
};

const output = (comp: Computer) => {
	comp.out.push(combo(comp) & 7n);
};

const bdv = (comp: Computer) => {
	comp.b = comp.a >> combo(comp);
};

const cdv = (comp: Computer) => {
	comp.c = comp.a >> combo(comp);
};

export const runProg = (comp: Computer, maxLen: number = 20) => {
	while (comp.ptr < comp.prog.length && comp.out.length < maxLen) {
		switch (Number(comp.prog[comp.ptr])) {
			case 0:
				adv(comp);
				comp.ptr += 2;
				break;
			case 1:
				bxl(comp);
				comp.ptr += 2;
				break;
			case 2:
				bst(comp);
				comp.ptr += 2;
				break;
			case 3:
				comp.a !== 0n
					? (comp.ptr = Number(comp.prog[comp.ptr + 1]))
					: (comp.ptr += 2);
				break;
			case 4:
				bxc(comp);
				comp.ptr += 2;
				break;
			case 5:
				output(comp);
				comp.ptr += 2;
				break;
			case 6:
				bdv(comp);
				comp.ptr += 2;
				break;
			case 7:
				cdv(comp);
				comp.ptr += 2;
				break;
			default:
				comp.ptr += 2;
				break;
		}
	}
};

const main = (input: string): string => {
	const comp = parseInput(input);
	runProg(comp, 20);
	return comp.out.join(',');
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
