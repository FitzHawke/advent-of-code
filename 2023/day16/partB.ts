import { energize, parseInput } from "./partA.js";

const findBest = (board:string[][]):number => {
	const energizedTiles:number[] = []
	for (let i = 0; i < board[0].length; i++) {
		energizedTiles.push(energize(board,[0,i],'d'))
		energizedTiles.push(energize(board,[board.length-1,i],'u'))
	}
	for (let i = 0; i < board.length; i++) {
		energizedTiles.push(energize(board,[i,0],'r'))
		energizedTiles.push(energize(board,[i,board[0].length-1],'l'))
	}

	return Math.max(...energizedTiles)
}

const main = (input: string): number => {
	const board = parseInput(input)
	return findBest(board);
};

export default function (input: string): number {
	console.log('\nDay 16: The Floor Will Be Lava\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
