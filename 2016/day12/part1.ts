type InsType = {
	instruction: 'cpy' | 'inc' | 'dec' | 'jnz';
	rSrc?: 'a' | 'b' | 'c' | 'd';
	rDest?: 'a' | 'b' | 'c' | 'd';
	src?: 'a' | 'b' | 'c' | 'd' | number;
	dest?: 'a' | 'b' | 'c' | 'd' | number;
};

export type RegistersType = {
	a: number;
	b: number;
	c: number;
	d: number;
};

const cpy = (registers: RegistersType, instruction: InsType): void => {
	const src =
		typeof instruction.src === 'number'
			? instruction.src
			: registers[instruction.src];
	registers[instruction.rDest] = src;
};

const inc = (registers: RegistersType, instruction: InsType): void => {
	registers[instruction.rSrc] += 1;
};

const dec = (registers: RegistersType, instruction: InsType): void => {
	registers[instruction.rSrc] -= 1;
};

const jnz = (
	registers: RegistersType,
	instruction: InsType,
	idx: number,
): number => {
	const src =
		typeof instruction.src === 'number'
			? instruction.src
			: registers[instruction.src];
	const dst =
		typeof instruction.dest === 'number'
			? instruction.dest
			: registers[instruction.dest];

	if (src !== 0) return idx + dst - 1;

	return idx;
};

export const parseInput = (input: string): InsType[] => {
	const instructions: InsType[] = [];
	input
		.trimEnd()
		.split('\n')
		.forEach((cur) => {
			const [ins, pSrc, pDst] = cur.split(' ');

			if (ins === 'cpy') {
				const rDest = pDst as keyof RegistersType;
				const src = !isNaN(Number(pSrc))
					? Number(pSrc)
					: (pSrc as keyof RegistersType);
				instructions.push({ instruction: ins, src, rDest });
			}

			if (ins === 'inc') {
				const rSrc = pSrc as keyof RegistersType;
				instructions.push({ instruction: ins, rSrc });
			}

			if (ins === 'dec') {
				const rSrc = pSrc as keyof RegistersType;
				instructions.push({ instruction: ins, rSrc });
			}

			if (ins === 'jnz') {
				const src = !isNaN(Number(pSrc))
					? Number(pSrc)
					: (pSrc as keyof RegistersType);
				const dest = !isNaN(Number(pDst))
					? Number(pDst)
					: (pDst as keyof RegistersType);
				instructions.push({ instruction: ins, src, dest });
			}
		});

	return instructions;
};

export const calcRegisters = (
	instructions: InsType[],
	registers: RegistersType,
): number => {
	for (let i = 0; i < instructions.length; i++) {
		const ins = instructions[i];
		if (ins.instruction === 'cpy') cpy(registers, ins);
		if (ins.instruction === 'inc') inc(registers, ins);
		if (ins.instruction === 'dec') dec(registers, ins);
		if (ins.instruction === 'jnz') i = jnz(registers, ins, i);
	}

	return registers.a;
};

const main = (input: string): number => {
	const instructions = parseInput(input);
	const registers: RegistersType = { a: 0, b: 0, c: 0, d: 0 };
	return calcRegisters(instructions, registers);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
