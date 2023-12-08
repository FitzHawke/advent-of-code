export type maps = {
	directions: string;
	nodes: map;
};

export type map = {
	[key: string]: node;
};

export type node = {
	left: string;
	right: string;
};

export const parseInput = (input: string): maps => {
	const [directions, allNodes] = input.split('\n\n');
	const nodes = allNodes.split('\n').reduce((acc, cur) => {
		const [name, left, right] = [...cur.match(/\w+/g)!];
		acc[name] = { left, right };
		return acc;
	}, {} as map);

	return { directions, nodes };
};

export const countSteps = (
	maps: maps,
	start: string = 'AAA',
	end: Function = (loc: string) => loc === 'ZZZ',
): number => {
	let curLoc = start;
	let position = 0;
	let enRoute = true;
	let stepsTaken = 0;

	while (enRoute) {
		const d = maps.directions[position];
		position++;
		if (position >= maps.directions.length) position = 0;
		stepsTaken++;
		if (d === 'L') {
			curLoc = maps.nodes[curLoc]!.left;
		} else if (d === 'R') {
			curLoc = maps.nodes[curLoc]!.right;
		}
		if (end(curLoc)) enRoute = false;
	}
	return stepsTaken;
};

const main = (input: string): number => {
	const allMaps = parseInput(input);
	return countSteps(allMaps);
};

export default function (input: string): number {
	console.log('\nDay 08: Haunted Wasteland\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
