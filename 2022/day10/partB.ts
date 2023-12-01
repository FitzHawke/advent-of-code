export default function (input: string): string {
	const cycles: string[] = input.split('\n');
	let x = 1,
		count = 0,
		skip = false;

	const crt: string[][] = [...new Array(6)].map(() => new Array(40).fill('.'));

	for (let i = 0; i < cycles.length; i++) {
		const num = cycles[i - 1]?.split(' ')[1];
		if (Math.abs(x - (count % 40)) <= 1)
			crt[Math.floor(count / 40)][count % 40] = '#';
		count++;
		if (skip) {
			skip = false;
			i--;
		} else if (num && !skip) {
			x += Number(num);
			skip = true;
		}
	}
	return crt.map((arr) => arr.join('')).join('\n');
}
