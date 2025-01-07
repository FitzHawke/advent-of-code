type Topography = Map<string, number>;

export const idFromCoord = (r: number, c: number): string => [r, c].join('_');
export const coordFromId = (id: string): number[] => id.split('_').map(Number);

const directions = [
	[0, 1],
	[0, -1],
	[1, 0],
	[-1, 0],
];

export const parseInput = (input: string): Topography => {
	const topoMap = new Map<string, number>();

	input
		.trimEnd()
		.split('\n')
		.map((line, r) => {
			line.split('').map((v, c) => {
				topoMap.set(idFromCoord(r, c), Number(v));
			});
		});

	return topoMap;
};

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
		const seen = new Set<string>()
		const step = (r: number, c: number, val: number) => {
			if (val === 9) {
				seen.add(idFromCoord(r,c))
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

		paths += seen.size
	}

	return paths;
};

const main = (input: string): number => {
	const topoMap = parseInput(input);
	return walkTheMap(topoMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
