import { parseInput, runCircuit } from './partA';

const main = (input: string): number => {
	const wires = parseInput(input);
	wires['b'] = { oper: 'd', op2: String(runCircuit(wires)) };
	const val = runCircuit(wires);
	return val;
};

export default function (input: string): number {
	console.log('\nDay 07: Some Assembly Required\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
