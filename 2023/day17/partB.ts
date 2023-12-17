import { directions, findBestPath, parseInput } from "./partA.js";

const main = (input: string): number => {
	const lossMap = parseInput(input);
	const moveFunc = (
		lossMap: number[][],
		r: number,
		c: number,
		dir: string,
	) => {
		const newPositions: [number, number, number, string][] = [];
		let val = 0;
		for (let i = 1; i <= 10; i++) {
			const r2 = r + i * directions.get(dir)![0];
			const c2 = c + i * directions.get(dir)![1];
			if (r2 < 0 || c2 < 0 || r2 >= lossMap.length || c2 >= lossMap[0].length)
				break;
			val += lossMap[r2][c2]
			if (i<4) continue
			if (dir === 'u' || dir === 'd') {
				newPositions.push([r2, c2, val, 'l'], [r2, c2, val, 'r']);
			} else {
				newPositions.push([r2, c2, val, 'u'], [r2, c2, val, 'd']);
			}
		}
		return newPositions;
	};
	return findBestPath(lossMap, moveFunc);
};

export default function (input: string): number {
	console.log('\nDay 17: Title\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
