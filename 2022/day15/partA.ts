import { checkOverlap } from './partB';

type Loc = {
	s: coords;
	b: coords;
};
type coords = {
	x: number;
	y: number;
};
type range = [number, number];

const parse = (rawLocs: string[]): Loc[] => {
	const locs: Loc[] = [];
	for (const loc of rawLocs) {
		const [sLoc, bLoc] = loc.split(':');
		const [x1, y1] = sLoc
			.split(',')
			.map((ele) => Number(ele.split('=').at(-1)));
		const [x2, y2] = bLoc
			.split(',')
			.map((ele) => Number(ele.split('=').at(-1)));

		locs.push({ s: { x: x1, y: y1 }, b: { x: x2, y: y2 } });
	}
	return locs;
};

export default function (input: string, row: number): number {
	const locs = parse(input.split('\n'));
	const SBLoc = new Set() as Set<number>;

	for (const loc of locs) {
		if (loc.b.y === row) SBLoc.add(loc.b.x);
		if (loc.s.y === row) SBLoc.add(loc.s.x);
	}

	const ranges: range[] = [];
	for (const loc of locs) {
		const radius = Math.abs(loc.s.x - loc.b.x) + Math.abs(loc.s.y - loc.b.y);
		const dist = Math.abs(loc.s.y - row);
		if (dist <= radius) {
			const xMin = loc.s.x - (radius - dist);
			const xMax = loc.s.x + (radius - dist);
			if (ranges.length === 0) {
				ranges.push([xMin, xMax]);
			} else {
				let curMin = xMin;
				let curMax = xMax;
				for (let j = ranges.length - 1; j >= 0; j--) {
					let [curX1, curX2] = ranges[j];
					if (checkOverlap([curMin, curMax], [curX1, curX2])) {
						curMin = Math.min(curMin, curX1);
						curMax = Math.max(curMax, curX2);
						ranges.splice(j, 1);
					}
				}
				ranges.push([curMin, curMax]);
			}
		}
	}

	let count = 0;
	for (const range of ranges) {
		for (let i = range[0]; i <= range[1]; i++) {
			if (!SBLoc.has(i)) count++;
		}
	}

	return count;
}
