import { countPossibleArrangements, parseInput } from "./partA.js";

const expandInput = (allSprings:string[][][]):string[][][] => {
	return allSprings.map(curRow => {
		const left = [0,"?",1,"?",2,"?",3,"?",4].flatMap((c)=>c==='?'?'?':curRow[0])
		const right = [0,1,2,3,4].flatMap(()=>curRow[1])
		return [left,right]
	})
}

const main = (input: string): number => {
	const allSprings = expandInput(parseInput(input));
	return countPossibleArrangements(allSprings);
};

export default function (input: string): number {
	console.log('\nDay 12: Title\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
