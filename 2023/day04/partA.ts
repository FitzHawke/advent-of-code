type numberGroup = Set<number>;
type card = {
	ownNums: numberGroup;
	winNums: numberGroup;
};

export const parseInput = (input: string): card[] => {
	const cards: card[] = [];

	input.split('\n').map((curCard) => {
		const [own, win] = curCard
			.split(': ')[1]
			.split(' | ')
			.map((cur) => cur.trim());
		const ownNums = new Set(
			own
				.split(' ')
				.map(Number)
				.filter((a) => a !== 0),
		);
		const winNums = new Set(
			win
				.split(' ')
				.map(Number)
				.filter((a) => a !== 0),
		);
		cards.push({ ownNums, winNums });
	});

	return cards;
};

const countWins = (cards: card[]): number => {
	let count = 0;

	for (const card of cards) {
		console.log(card);
		let cardCount = 0;
		for (const num of card.ownNums) {
			if (card.winNums.has(num)) cardCount++;
		}
		if (cardCount > 0) count += Math.pow(2, cardCount - 1);
	}

	return count;
};

const main = (input: string): number => {
	const cards = parseInput(input);
	return countWins(cards);
};

export default function (input: string): number {
	console.log('\nDay 04: Scratchcards\nPart A');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
