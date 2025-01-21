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

export const testDesign = (
	design: string,
	styles: Set<string>,
	max: number,
	cache: Map<string, number>,
): number => {
	const removeTowel = (des: string): number => {
		if (cache.has(des)) return cache.get(des);
		let count = 0;
		for (let i = 1; i <= max; i++) {
			if (i > des.length) continue;
			if (i === des.length && styles.has(des)) count += 1;
			if (styles.has(des.substring(0, i))) {
				count += removeTowel(des.substring(i));
			}
		}
		if (count > 0) cache.set(des, count);
		return count;
	};
	return removeTowel(design);
};

const main = (input: string): number => {
	const cache = new Map<string, number>();
	const towelDesigns = parseInput(input);
	return towelDesigns.designs.reduce(
		(a, c) =>
			testDesign(c, towelDesigns.styles, towelDesigns.mostStripes, cache) > 0
				? a + 1
				: a,
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
