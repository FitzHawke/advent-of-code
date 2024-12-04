export const parseInput = (input:string): string[] => {
	return input.trimEnd().split('\n')
}

const main = (input: string): number => {
	console.log(parseInput(input))
	return 0;
};

export default function (input: string, title:string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed')
	const result = main(input);
	console.timeEnd('Time elapsed')
	return result;
}
