export type race = {
	t: number
	d: number
}

const parseInput = (input:string): race[] => {
	const raceList:race[] = []
	const [t,d] = input.split('\n').map(cur=>cur.match(/\d+/g)!.map(Number))
	t!.forEach((cur,idx)=>raceList.push({t: cur, d: d[idx]}))
	return raceList;
}

const countWinningOptions = (races:race[]):number => {
	let winning = 1

	for (const h of races) {
		const x1 = (h.t-Math.sqrt(Math.pow(h.t,2)-(4.001*h.d)))/2
		const x2 = (h.t+Math.sqrt(Math.pow(h.t,2)-(4.001*h.d)))/2

		winning *= Math.floor(x2)-Math.ceil(x1)+1
	}

	return winning;
}

const main = (input: string): number => {
	const races = parseInput(input)
	return countWinningOptions(races);
};

export default function (input: string): number {
	console.log('\nDay 06: Title\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
