type FloorContents = {
	micro: string[];
	gen: string[];
};

export type FloorMap = Map<number, FloorContents>;

export const parseInput = (input: string): string => {
	const floorMap: FloorMap = new Map();

	input
		.trimEnd()
		.split('\n')
		.map((cur, i) => {
			const floor: FloorContents = { micro: [], gen: [] };
			const words = cur
				.replaceAll('.', '')
				.replaceAll(',', '')
				.replaceAll('-', ' ')
				.split(' ');
			for (let j = 0; j < words.length; j++) {
				if (words[j] === 'generator') {
					floor.gen.push(words[j - 1]);
				} else if (words[j] === 'microchip') {
					floor.micro.push(words[j - 2]);
				}
			}
			floorMap.set(i + 1, floor);
		});
	return serialize(floorMap);
};

export const serialize = (map: FloorMap): string => {
	const serial: string[] = [];
	for (const [key, val] of map) {
		serial.push([key, val.gen.join('_'), val.micro.join('_')].join('-'));
	}

	return serial.join(' ');
};

const deserialize = (inp: string): FloorMap => {
	const floorMap: FloorMap = new Map();
	for (const floor of inp.split(' ')) {
		const [num, g, m] = floor.split('-');
		floorMap.set(Number(num), {
			micro: m.split('_').filter((c) => c !== ''),
			gen: g.split('_').filter((c) => c !== ''),
		});
	}
	return floorMap;
};

const moveItems = (serialized: string) => {
	const queue: [string, number, number][] = [[serialized, 1, 0]];
	const seen = new Set<string>();

	const findPairs = (): string[] => {
		const p: string[] = [];
		const floorMap = deserialize(serialized);
		[1, 2, 3, 4].forEach((num) => {
			const gens = floorMap.get(num).gen;
			for (const gen of gens) p.push(gen);
		});
		return p;
	};
	const pairs: string[] = findPairs();

	const calcState = (floorMap: FloorMap, lvl: number) => {
		const eqPairs: string[] = [];
		for (const pair of pairs) {
			let locGen: number;
			let locMic: number;
			for (const num of [1, 2, 3, 4]) {
				const fl = floorMap.get(num);
				if (fl.gen.includes(pair)) locGen = num;
				if (fl.micro.includes(pair)) locMic = num;
			}
			eqPairs.push([locGen, locMic].join('_'));
		}
		eqPairs.sort((a, b) => Number(b[0]) - Number(a[0]));
		eqPairs.push(`${lvl}`);
		return eqPairs.join('-');
	};

	const burnMicroChips = (gen: string[], mic: string[]): boolean => {
		if (gen.length === 0) return false;

		for (const m of mic) {
			if (!gen.includes(m)) return true;
		}

		return false;
	};

	const checkComplete = (floorMap: FloorMap, cur: number): boolean => {
		if (cur !== 4) return false;
		for (const lvl of [1, 2, 3]) {
			if (
				floorMap.get(lvl).gen.length !== 0 ||
				floorMap.get(lvl).micro.length !== 0
			)
				return false;
		}
		return true;
	};

	const getPermutations = (gen: string[], mic: string[]) => {
		const moves: { gen: string[]; micro: string[] }[] = [];
		gen.forEach((g) => moves.push({ gen: [g], micro: [] }));
		mic.forEach((m) => moves.push({ gen: [], micro: [m] }));

		for (let i = 0; i < gen.length; i++) {
			for (let j = i + 1; j < gen.length; j++) {
				moves.push({ gen: [gen[i], gen[j]], micro: [] });
			}
		}

		for (let i = 0; i < mic.length; i++) {
			for (let j = i + 1; j < mic.length; j++) {
				moves.push({ gen: [], micro: [mic[i], mic[j]] });
			}
		}

		for (let i = 0; i < mic.length; i++) {
			for (let j = 0; j < gen.length; j++) {
				moves.push({ gen: [gen[j]], micro: [mic[i]] });
			}
		}

		return moves;
	};

	while (queue.length > 0) {
		const [serial, fl, mv] = queue.shift();
		const floorMap = deserialize(serial);

		const id = calcState(floorMap, fl);
		if (seen.has(id)) continue;
		else seen.add(id);

		const floor = floorMap.get(fl);

		if (checkComplete(floorMap, fl)) return mv;

		for (const dir of [-1, 1]) {
			const newFl = fl + dir;
			if (newFl < 1 || newFl > 4) continue;
			for (const move of getPermutations(floor.gen, floor.micro)) {
				const tmpMap = deserialize(serial);
				const cur = tmpMap.get(fl);
				const next = tmpMap.get(newFl);

				for (const g of move.gen) {
					cur.gen = cur.gen.filter((c) => c !== g);
					next.gen.push(g);
				}

				for (const m of move.micro) {
					cur.micro = cur.micro.filter((c) => c !== m);
					next.micro.push(m);
				}

				if (burnMicroChips(next.gen, next.micro)) continue;
				const newSerial = serialize(tmpMap);
				queue.push([newSerial, newFl, mv + 1]);
			}
		}
	}

	return 0;
};

const main = (input: string): number => {
	const floorMap = parseInput(input);
	console.log(floorMap, deserialize(floorMap));
	return moveItems(floorMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
