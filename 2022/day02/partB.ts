export default function (input: string): number {
	let hash = new Map()
		.set('A', 1)
		.set('B', 2)
		.set('C', 3)
		.set('X', 0)
		.set('Y', 3)
		.set('Z', 6);

	let games = input.split('\n');
	let score = 0;

	for (let game of games) {
		score += hash.get(game[2]);
		let opp = hash.get(game[0]);

		if (game[2] === 'X') score += opp - 1 === 0 ? 3 : opp - 1;
		else if (game[2] === 'Y') score += opp;
		else score += opp + 1 === 4 ? 1 : opp + 1;
	}
	return score;
}
