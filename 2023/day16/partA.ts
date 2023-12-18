export const mirrorMap = new Map<string, string>()
	.set('l_/', 'd')
	.set('u_/', 'r')
	.set('r_/', 'u')
	.set('d_/', 'l')
	.set('l_\\', 'u')
	.set('d_\\', 'r')
	.set('r_\\', 'd')
	.set('u_\\', 'l')
	.set('l_|', 'u_d')
	.set('r_|', 'u_d')
	.set('d_|', 'd')
	.set('u_|', 'u')
	.set('u_-', 'l_r')
	.set('d_-', 'l_r')
	.set('l_-', 'l')
	.set('r_-', 'r');

export const directions = new Map<string, number[]>()
	.set('u', [-1, 0])
	.set('d', [1, 0])
	.set('l', [0, -1])
	.set('r', [0, 1]);

export const join = (char:string,...args:(string|number)[]): string => {
	return args.join(char);
};

export const energize = (board: string[][],start:number[],startDir:string):number => {
	const visited = new Set<string>()
	const energized = new Set<string>()

	const lightMeUp = (r:number, c:number, dir:string):void => {
		if (r < 0 || c < 0 || r >= board.length || c >= board[0].length) return
		const loc = join('_',r,c)
		const id = join('_',r,c,dir)
		if (visited.has(id)) return
		energized.add(loc);
		visited.add(id);

		const cur = board[r][c]
		if (mirrorMap.has(join('_',dir,cur))) {
			const newDirs = mirrorMap.get(join('_',dir,cur))!.split('_')
			for (const nd of newDirs) {
				lightMeUp(r+directions.get(nd)![0],c+directions.get(nd)![1],nd)
			}
		} else {
			lightMeUp(r+directions.get(dir)![0],c+directions.get(dir)![1],dir)
		}
	}

	lightMeUp(start[0],start[1],startDir);

	return energized.size;
}

export const parseInput = (input: string): string[][] => {
	return input.split('\n').map((cur) => cur.split(''));
};

const main = (input: string): number => {
	const board = parseInput(input)
	return energize(board,[0,0],'r');
};

export default function (input: string): number {
	console.log('\nDay 16: The Floor Will Be Lava\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
