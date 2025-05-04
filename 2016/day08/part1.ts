export type OpType = {
	op: string;
	a: number;
	b: number;
};

export const parseInput = (input: string): OpType[] => {
	return input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			let op = '';
			if (cur.startsWith('rect')) op = 'rect';
			else if (cur.startsWith('rotate col')) op = 'col';
			else if (cur.startsWith('rotate row')) op = 'row';

			const [a, b] = [...cur.matchAll(/\d+/g)].map(Number);
			return { op, a, b } as OpType;
		});
};

const performOperations = (
	opList: OpType[],
	w: number,
	h: number,
): Set<string> => {
	const active = new Set<string>();

	const rect = (a: number, b: number): void => {
		for (let i = 0; i < a && i < w; i++) {
			for (let j = 0; j < b && j < h; j++) {
				const loc = [i, j].join('_');
				active.add(loc);
			}
		}
	};

	const row = (a: number, b: number): void => {
		const newActive: string[] = [];
		for (let i = 0; i < w; i++) {
			const loc = [i, a].join('_');
			if (active.delete(loc)) {
				newActive.push([(i + b) % w, a].join('_'));
			}
		}
		for (const l of newActive) active.add(l);
	};

	const col = (a: number, b: number): void => {
		const newActive: string[] = [];
		for (let i = 0; i < h; i++) {
			const loc = [a, i].join('_');
			if (active.delete(loc)) {
				newActive.push([a, (i + b) % h].join('_'));
			}
		}
		for (const l of newActive) active.add(l);
	};

	for (const op of opList) {
		if (op.op === 'rect') rect(op.a, op.b);
		else if (op.op === 'row') row(op.a, op.b);
		else if (op.op === 'col') col(op.a, op.b);
	}

	console.log(active);

	return active;
};

const main = (input: string, w: number, h: number): number => {
	const opList = parseInput(input);
	const active = performOperations(opList, w, h);
	return active.size;
};

export default function (
	input: string,
	title: string,
	w: number,
	h: number,
): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input, w, h);
	console.timeEnd('Time elapsed');
	return result;
}
