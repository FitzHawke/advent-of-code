import { games, parseInputs } from './partA.js';

const calculateGamePower = (gameList: games): number => {
	let gamePowerSum = 0;
	for (const id in gameList) {
		let red = 0,
			blue = 0,
			green = 0;
		for (const handful of gameList[id]) {
			if (handful.red > red) red = handful.red;
			if (handful.green > green) green = handful.green;
			if (handful.blue > blue) blue = handful.blue;
		}
		gamePowerSum += red * blue * green;
	}
	return gamePowerSum;
};

const main = (input: string): number => {
	const gameList = parseInputs(input);
	return calculateGamePower(gameList);
};

export default function (input: string): number {
	console.log('\nDay 02: Cube Conundrum\nPart B');
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
