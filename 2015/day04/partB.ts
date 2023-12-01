import md5 from 'blueimp-md5';

const main = (input: string): number => {
	let i = 0;
	while (true) {
		const hashTest = input + String(i);
		const hash = md5(hashTest);
		if (parseInt(hash.slice(0, 6), 16) === 0) return i;
		i++;
	}
	return 0;
};

export default function (input: string): number {
	console.log('\nDay 04: The Ideal Stocking Stuffer\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
