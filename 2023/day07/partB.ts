export type hand = {
	cards: string;
	bid: number;
	strength: number;
};

const cardStrengthList = 'J23456789TQKA';

const findType = (cards: string): number => {
	const hash = cards
		.split('')
		.reduce(
			(acc, cur) => acc.set(cur, (acc.has(cur) ? acc.get(cur)! : 0) + 1),
			new Map<string, number>(),
		);
	if ((hash.get('J') || 5) < 5) {
		const iter = hash.keys();
		for (const key of iter) {
			if (key !== 'J') hash.set(key, hash.get(key)! + hash.get('J')!);
		}
		hash.delete('J');
	}
	if (hash.size === 1) {
		return 7;
	} else if (hash.size === 2) {
		const iter = hash.values();
		if (iter.next().value === 4 || iter.next().value === 4) {
			return 6;
		} else return 5;
	} else if (hash.size === 3) {
		const iter = hash.values();
		if (
			iter.next().value === 3 ||
			iter.next().value === 3 ||
			iter.next().value === 3
		) {
			return 4;
		} else return 3;
	} else if (hash.size === 4) {
		return 2;
	} else {
		return 1;
	}
};

const parseInput = (input: string): hand[] => {
	const hands: hand[] = input.split('\n').map((cur) => {
		let [cards, bid] = cur.split(' ');
		return { cards, bid: Number(bid), strength: findType(cards) };
	});

	return hands;
};

const playGame = (hands: hand[]): number => {
	const findCardStrength = (card: string): number => {
		return cardStrengthList.search(card);
	};

	hands.sort((a, b) => {
		if (a.strength === b.strength) {
			for (let i = 0; i < a.cards.length; i++) {
				if (a.cards[i] !== b.cards[i]) {
					return findCardStrength(a.cards[i]) - findCardStrength(b.cards[i]);
				}
			}
			return 0;
		} else {
			return a.strength - b.strength;
		}
	});

	return hands.reduce((acc, cur, idx) => (acc += cur.bid * (idx + 1)), 0);
};

const main = (input: string): number => {
	const hands = parseInput(input);
	return playGame(hands);
};

export default function (input: string): number {
	console.log('\nDay 07: Camel Cards\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
