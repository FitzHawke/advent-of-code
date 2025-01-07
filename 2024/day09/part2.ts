import { Block, checksum, parseInput } from './part1.ts';

const moveFiles = (diskMap: Block[]): Block[] => {
	const newMap = [...diskMap];
	let prevID = 10000;

	const mergeSpaces = (loc: number, size: number): void => {
		const lSpace: boolean = newMap[loc - 1][0] === 'S';
		const rSpace: boolean =
			loc + 1 < newMap.length - 1 && newMap[loc + 1][0] === 'S';

		if (lSpace && rSpace) {
			newMap.splice(loc - 1, 3, [
				'S',
				newMap[loc - 1][1] + size + newMap[loc + 1][1],
			]);
		} else if (lSpace) {
			newMap.splice(loc - 1, 2, ['S', newMap[loc - 1][1] + size]);
		} else if (rSpace) {
			newMap.splice(loc, 2, ['S', size + newMap[loc + 1][1]]);
		} else {
			newMap.splice(loc, 1, ['S', size]);
		}
	};

	const insertFile = (loc: number, file: Block): number => {
		const extra: boolean = newMap[loc][1] > file[1];

		if (extra) {
			newMap.splice(loc, 1, file, ['S', newMap[loc][1] - file[1]]);
			return 1;
		} else {
			newMap.splice(loc, 1, file);
			return 0;
		}
	};

	for (let i = diskMap.length - 1; i >= 0; i--) {
		for (let j = 0; j < i; j++) {
			if (
				newMap[j][0] === 'S' &&
				newMap[j][1] >= newMap[i][1] &&
				newMap[i][0] !== 'S' &&
				prevID > Number(newMap[i][0])
			) {
				const cur = newMap[i];
				mergeSpaces(i, cur[1]);
				i += insertFile(j, cur);
				prevID = Number(cur[0]);
				break;
			}
		}
	}

	return newMap;
};

const main = (input: string): number => {
	const diskMap = moveFiles(parseInput(input).filter((val) => val[1] !== 0));
	return checksum(diskMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
