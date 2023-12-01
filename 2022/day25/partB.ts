const main = (input: string): string => {
	return 'Merry Christmas 2022 :D';
};

export default function (input: string): string {
	console.log('\nDay 25: Title\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
