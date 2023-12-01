export default function (input: string): number {
	const cycles: string[] = input.split('\n');
	let x = 1,
		sum = 0,
		count = 0,
		skip = false;

	for (let i = 0; i < cycles.length; i++) {
		count++;
		if ((count - 20) % 40 === 0) sum += x * count;
		const num = cycles[i - 1]?.split(' ')[1];
		if (skip) {
			skip = false;
			i--;
		} else if (num && !skip) {
			x += Number(num);
			skip = true;
		}
	}
	return sum;
}
