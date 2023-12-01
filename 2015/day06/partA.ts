export type Instruction = {
	type: InstType;
	start: Coord;
	end: Coord;
};

type InstType = 'on' | 'off' | 'toggle';
type Coord = [number, number];

export const parseInputs = (input: string): Instruction[] => {
	const instructions = [] as Instruction[];
	input
		.trim()
		.split('\n')
		.forEach((inst) => {
			const t = inst.split(' ');

			let type: InstType = 'toggle';
			t.splice(0, 1);
			if (t[0] === 'on') {
				type = 'on';
				t.splice(0, 1);
			} else if (t[0] === 'off') {
				type = 'off';
				t.splice(0, 1);
			}

			const [sX, sY] = t[0].split(',').map(Number);
			const [eX, eY] = t[2].split(',').map(Number);

			instructions.push({ type, start: [sX, sY], end: [eX, eY] });
		});
	return instructions;
};

const lightItUp = (instructions: Instruction[]): number => {
	const lights = new Set() as Set<string>;
	for (const inst of instructions) {
		for (let i = inst.start[0]; i <= inst.end[0]; i++) {
			for (let j = inst.start[1]; j <= inst.end[1]; j++) {
				const loc = [i, j].join(',');
				if (inst.type === 'toggle' && lights.has(loc)) {
					lights.delete(loc);
				} else if (inst.type === 'toggle' && !lights.has(loc)) {
					lights.add(loc);
				} else if (inst.type === 'on' && !lights.has(loc)) {
					lights.add(loc);
				} else if (inst.type === 'off' && lights.has(loc)) {
					lights.delete(loc);
				}
			}
		}
	}
	return lights.size;
};

const main = (input: string): number => {
	const instructions = parseInputs(input);
	return lightItUp(instructions);
};

export default function (input: string): number {
	console.log('\nDay 06: Probably a Fire Hazard\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
