const main = (input: string): number => {
	let floor = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i] === '(') floor++;
		else if (input[i] === ')') floor--;

		if (floor === -1) return i + 1;
	}
	return floor;
};

export default function (input: string): number {
	console.log('\nDay 01: Not Quite Lisp\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
