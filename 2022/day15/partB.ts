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

export const checkOverlap = (cur: range, next: range): boolean => {
	if (cur[0] <= next[0] && next[1] <= cur[1]) return true;
	else if (next[0] <= cur[0] && cur[1] <= next[1]) return true;
	else if (cur[0] <= next[0] && next[0] <= cur[1]) return true;
	else if (next[0] <= cur[0] && cur[0] <= next[1]) return true;
	else if (cur[1] + 1 === next[0]) return true;
	else if (next[1] + 1 === cur[0]) return true;
	else return false;
};

export default function (input: string, maxSize: number): number {
	const locs = parse(input.split('\n'));

	for (let i = maxSize; i >= 0; i--) {
		const ranges: range[] = [];
		for (const loc of locs) {
			const radius = Math.abs(loc.s.x - loc.b.x) + Math.abs(loc.s.y - loc.b.y);
			const dist = Math.abs(loc.s.y - i);
			if (dist <= radius) {
				const xMin = Math.max(0, loc.s.x - (radius - dist));
				const xMax = Math.min(maxSize, loc.s.x + (radius - dist));
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
		if (ranges[0][0] !== 0 || ranges[0][1] !== maxSize) {
			let missing = 0;
			if (ranges[0][0] < ranges[1][0]) {
				missing = ranges[0][1] + 1;
			} else {
				missing = ranges[1][1] + 1;
			}
			return missing * 4000000 + i;
		}
	}

	return 0;
}
