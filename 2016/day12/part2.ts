import { calcRegisters, parseInput, RegistersType } from './part1.ts';

const main = (input: string): number => {
	const instructions = parseInput(input);
	const registers: RegistersType = { a: 0, b: 0, c: 1, d: 0 };
	return calcRegisters(instructions, registers);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
