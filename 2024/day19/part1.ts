type towelInput = {
	designs: string[];
	styles: Set<string>;
	mostStripes: number;
};

export const parseInput = (input: string): towelInput => {
	const [allStyles, allDesigns] = input.trimEnd().split('\n\n');
	const stylesList = allStyles.split(', ').sort((a, b) => b.length - a.length);
	const mostStripes = stylesList[0].length;
	const designs = allDesigns.split('\n');
	const styles = new Set<string>(stylesList);
	return { styles, designs, mostStripes };
};

const testDesign = (
	design: string,
	styles: Set<string>,
	max: number,
): boolean => {
	const stack = [''];
	while (stack.length > 0) {
		const cur = stack.pop();
		if (cur === design) return true;

		for (let i = 1; i <= max; i++) {
			const testStr = design.substring(cur.length, cur.length + i);
			if (styles.has(testStr)) {
				stack.push([cur, testStr].join(''));
			}
		}
	}
	return false;
};

const main = (input: string): number => {
	const towelDesigns = parseInput(input);
	return towelDesigns.designs.reduce(
		(a, c) =>
			testDesign(c, towelDesigns.styles, towelDesigns.mostStripes) ? a + 1 : a,
		0,
	);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
