export const parseInput = (input:string):number[][] => {
	return input.split('\n').map(cur=>cur.split(' ').map(Number))
}

const extrapolateOasis = (histories:number[][]):number=> {
	let count = 0

	for (const hist of histories) {
		const diffs:number[][] = [hist];

		while (true) {
			const curDiffs:number[] = []
			for (let i=1;i<diffs.at(-1)!.length;i++){
				curDiffs.push(diffs.at(-1)![i]-diffs.at(-1)![i-1])
			}
			diffs.push(curDiffs)
			if (curDiffs.every(val => val === 0)) break;
		}
		count += diffs.reverse().reduce((acc,cur) => acc += cur.at(-1)!,0)
	}

	return count
}

const main = (input: string): number => {
	const histories = parseInput(input)
	return extrapolateOasis(histories);
};

export default function (input: string): number {
	console.log('\nDay 09: Mirage Maintenance\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
