export type Block = [number | 'S', number];

export const parseInput = (input: string): Block[] => {
	const hdd = input.trimEnd();
	const diskMap: Block[] = [];

	for (let i = 0; i < hdd.length; i++) {
		if (i % 2 === 0) {
			diskMap.push([i / 2, Number(hdd[i])]);
		} else {
			diskMap.push(['S', Number(hdd[i])]);
		}
	}

	return diskMap;
};

const moveBlocks = (diskMap: Block[]): Block[] => {
	const newMap: Block[] = [];
	let l = 0;
	let r = diskMap.length - 1;

	let prevNum = 0;
	let remainSp = 0;
	while (l < r) {
		if (diskMap[l][0] !== 'S') {
			newMap.push(diskMap[l]);
			l++;
			continue;
		}

		let OS = diskMap[l][1];
		let SR = diskMap[r][1];
		let curNum = Number(diskMap[r][0]);

		if (remainSp > 0) {
			SR = remainSp;
			curNum = prevNum;
		}

		if (remainSp < 0) OS = -remainSp;

		if (OS >= SR) {
			newMap.push([curNum, SR]);
		} else {
			newMap.push([curNum, OS]);
		}

		prevNum = curNum;
		remainSp = SR - OS;

		if (remainSp > 0) l++;
		else if (remainSp < 0) r -= 2;
		else {
			l++;
			r -= 2;
		}
	}

	if (remainSp > 0) newMap.push([prevNum, remainSp]);
	return newMap;
};

export const checksum = (diskMap: Block[]): number => {
	let count = 0;
	let curIdx = 0;
	for (const bl of diskMap) {
		const len = Number(bl[1]);
		if (bl[0] !== 'S') {
			const num = Number(bl[0]);
			for (let i = curIdx; i < curIdx + len; i++) {
				count += num * i;
			}
		}
		curIdx += len;
	}
	return count;
};

const main = (input: string): number => {
	const diskMap = moveBlocks(parseInput(input));
	return checksum(diskMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
