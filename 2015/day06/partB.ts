import { Instruction, parseInputs } from './partA';

const lightItUp = (instructions: Instruction[]): number => {
	const lights = new Map() as Map<string, number>;
	for (const inst of instructions) {
		for (let i = inst.start[0]; i <= inst.end[0]; i++) {
			for (let j = inst.start[1]; j <= inst.end[1]; j++) {
				const loc = [i, j].join(',');
				if (inst.type === 'toggle') {
					lights.set(loc, (lights.get(loc) || 0) + 2);
				} else if (inst.type === 'on') {
					lights.set(loc, (lights.get(loc) || 0) + 1);
				} else if (inst.type === 'off') {
					lights.set(loc, Math.max((lights.get(loc) || 0) - 1, 0));
				}
			}
		}
	}
	let light = 0;
	for (const [_, val] of lights) {
		light += val;
	}
	return light;
};

const main = (input: string): number => {
	const instructions = parseInputs(input);
	return lightItUp(instructions);
};

export default function (input: string): number {
	console.log('\nDay 06: Probably a Fire Hazard\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
