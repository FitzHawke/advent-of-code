import { coordFromId, directions, idFromCoord, parseInput, Topography } from './part1.ts';

const walkTheMap = (topoMap: Topography): number => {
	const findStartPoints = (): string[] => {
		let points: string[] = [];
		for (const [coord, height] of topoMap) {
			if (height === 0) points.push(coord);
		}
		return points;
	};

	const startPoints = findStartPoints();
	let paths = 0;

	for (const point of startPoints) {
		const step = (r: number, c: number, val: number) => {
			if (val === 9) {
				paths += 1
			} else {
				for (const dir of directions) {
					const newR = r + dir[0]
					const newC = c + dir[1]
					const newVal = topoMap.get(idFromCoord(newR,newC))
					if (newVal===val+1){
						step(newR,newC,newVal)
					}
				}
			}
		};
		const [r,c] = coordFromId(point)
		step(r,c,0)
	}

	return paths;
};

const main = (input: string): number => {
	const topoMap = parseInput(input);
	return walkTheMap(topoMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed')
	const result = main(input);
	console.timeEnd('Time elapsed')
	return result;
}
