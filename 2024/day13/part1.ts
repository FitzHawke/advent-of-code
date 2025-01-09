export type Machine = {
	aX?: number;
	aY?: number;
	bX?: number;
	bY?: number;
	pX?: number;
	pY?: number;
};

export const parseInput = (input: string): Machine[] => {
	return input
		.trimEnd()
		.split('\n\n')
		.map((cur) => {
			const lines = cur.split('\n');
			const regex = /\d+/g;
			const machine = {} as Machine;
			for (const l in lines) {
				const [x, y] = [...lines[l].matchAll(regex)].map(Number);
				switch (l) {
					case '0':
						machine.aX = x;
						machine.aY = y;
						break;
					case '1':
						machine.bX = x;
						machine.bY = y;
						break;
					case '2':
						machine.pX = x;
						machine.pY = y;
						break;
					default:
						break;
				}
			}
			return machine;
		});
};

export const findBestPlay = (machine: Machine, offset:number = 0): number => {
	const realPX = offset + machine.pX;
	const realPY = offset + machine.pY;
	const d = calcDeter(machine.aX,machine.aY,machine.bX,machine.bY)
	const dA = calcDeter(realPX,realPY,machine.bX,machine.bY)
	const dB = calcDeter(machine.aX,machine.aY,realPX,realPY)

	const solA = dA/d
	const solB = dB/d

	if (solA % 1 === 0 && solB % 1 === 0) {
		return solA * 3 + solB
	}

	return 0;
};

const calcDeter = (a1: number, a2: number, b1: number, b2: number): number =>
	a1 * b2 - a2 * b1;

const main = (input: string): number => {
	return parseInput(input).reduce((acc, c) => acc + findBestPlay(c), 0);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
