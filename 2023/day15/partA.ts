export const parseInput = (input:string): string[] => {
	return input.split(',')
}

export const calculateHash = (seq:string):number => {
	let curVal = 0;
	for (let i = 0; i < seq.length; i++) {
		curVal = (curVal + seq[i].charCodeAt(0)) * 17 % 256
	}
	return curVal
}

const main = (input: string): number => {
	const initSequence = (parseInput(input))
	return initSequence.reduce((acc,cur)=> acc + calculateHash(cur),0);
};

export default function (input: string): number {
	console.log('\nDay 15: Lens Library\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
