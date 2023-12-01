export default function (input: string): string {
	const inputs = input.split('\n\n');
	const pic = inputs[0].split('\n');

	let stacks: string[][] = [];

	for (let i = pic.length - 2; i >= 0; i--) {
		for (let j = 1; j < pic[0].length; j += 4) {
			let stack = Math.floor(j / 4);
			if (!stacks[stack]) stacks[stack] = [];
			if (pic[i][j] !== ' ') stacks[stack].push(pic[i][j]);
		}
	}

	const insts = inputs[1].split('\n');

	for (let i of insts) {
		const n = i.split(' ');
		const tmp = stacks[+n[3] - 1].splice(stacks[+n[3] - 1].length - +n[1]);
		if (tmp) stacks[+n[5] - 1] = [...stacks[+n[5] - 1], ...tmp];
	}

	return stacks.reduce((acc, c) => acc + c.at(-1), '');
}
