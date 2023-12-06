import { race } from "./partA.js"

const parseInput = (input:string): race => {
	const [t,d] = input.split('\n').map(cur=>cur.match(/\d+/g))
	
	return {t:Number(t!.join('')),d:Number(d!.join(''))};
}

const countWinningOptions = (r:race):number => {
	const x1 = (r.t-Math.sqrt(Math.pow(r.t,2)-(4*r.d)))/2
	const x2 = (r.t+Math.sqrt(Math.pow(r.t,2)-(4*r.d)))/2

	return Math.floor(x2)-Math.ceil(x1)+1
}

const main = (input: string): number => {
	const race = parseInput(input)
	return countWinningOptions(race);
};

export default function (input: string): number {
	console.log('\nDay 06: Title\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
