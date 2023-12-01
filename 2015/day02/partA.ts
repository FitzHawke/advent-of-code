const findPaperNeeded = (box: string): number => {
	const [l, w, h] = box.split('x').map(Number);
	const sideA = l * w;
	const sideB = w * h;
	const sideC = l * h;
	return 2 * sideA + 2 * sideB + 2 * sideC + Math.min(sideA, sideB, sideC);
};

const main = (input: string): number => {
	const boxes = input.split('\n');
	let needed = 0;
	for (const box of boxes) {
		needed += findPaperNeeded(box);
	}
	return needed;
};

export default function (input: string): number {
	console.log('\nDay 02: I Was Told There Would Be No Math\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
