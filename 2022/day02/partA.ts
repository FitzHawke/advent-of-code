export default function (input: string): number {
	let hash = new Map()
		.set('A', 1)
		.set('B', 2)
		.set('C', 3)
		.set('X', 1)
		.set('Y', 2)
		.set('Z', 3);

	let games = input.split('\n');
	let score = 0;

	for (let game of games) {
		let matchScore = hash.get(game[2]) - hash.get(game[0]);
		score += hash.get(game[2]);

		if (matchScore === 0) score += 3;
		else if (matchScore === 1 || matchScore === -2) score += 6;
	}
	return score;
}
