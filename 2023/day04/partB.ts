import { card, parseInput } from "./partA.js";

const countCards = (cards: card[]): number => {
	let count = 0;

	for (let i = 0; i<cards.length;i++) {
		count+=cards[i].numberOfCards;
		let cardCount = 0;
		for (const num of cards[i].ownNums) {
			if (cards[i].winNums.has(num)) cardCount++;
		}
		for (let j=1;j<=cardCount;j++){
			cards[i+j].numberOfCards +=cards[i].numberOfCards;
		}
	}

	return count;
};

const main = (input: string): number => {
	const cards = parseInput(input);
	return countCards(cards);
};

export default function (input: string): number {
	console.log('\nDay 04: Scratchcards\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
