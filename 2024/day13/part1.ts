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

const findBestPlay = (machine: Machine): number => {
	const reqTokens:number[] = []

	for (let i = 0; i < 100; i++) {
		const testX = machine.aX * i
		const testY = machine.aY * i
		const remX = machine.pX - testX
		const remY = machine.pY - testY
		if (remX % machine.bX === 0 && remY % machine.bY ===0 && remX / machine.bX === remY / machine.bY ) {
			reqTokens.push(i * 3 + remX / machine.bX)
		}
	}

	return reqTokens.length > 0 ? Math.min(...reqTokens) : 0
};

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
