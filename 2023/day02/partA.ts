export type handful = {
	red: number;
	green: number;
	blue: number;
};

export type games = { [key: number]: handful[] };

export const parseInputs = (inputs: string): games => {
	const gameList = {} as games;
	inputs
		.trim()
		.split('\n')
		.map((curGame, i) => {
			let handfuls: handful[] = [];
			curGame
				.split(': ')[1]
				.split('; ')
				.map((curSet) => {
					let red = 0,
						green = 0,
						blue = 0;
					let curColours = curSet.split(', ');
					for (const colour of curColours) {
						const [num, col] = colour.split(' ');
						if (col === 'red') red = +num;
						else if (col === 'green') green = +num;
						else if (col === 'blue') blue = +num;
					}
					handfuls.push({ red, green, blue } as handful);
				});
			gameList[i + 1] = handfuls;
		});
	return gameList;
};

const countPossibleGames = (gameList: games, colours: handful): number => {
	let possibleCount = 0;
	for (const id in gameList) {
		let possible = true;
		for (const handful of gameList[id]) {
			if (
				handful.red > colours.red ||
				handful.green > colours.green ||
				handful.blue > colours.blue
			)
				possible = false;
		}
		if (possible) possibleCount += +id;
	}
	return possibleCount;
};

const main = (
	input: string,
	red: number,
	green: number,
	blue: number,
): number => {
	const gameList = parseInputs(input);
	return countPossibleGames(gameList, { red, green, blue });
};

export default function (
	input: string,
	red: number = 12,
	green: number = 13,
	blue: number = 14,
): number {
	console.log('\nDay 02: Cube Conundrum\nPart A');
	const startTime = new Date();
	const result = main(input, red, green, blue);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
