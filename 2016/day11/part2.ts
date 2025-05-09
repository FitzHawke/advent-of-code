import { deserialize, moveItems, parseInput, serialize } from './part1.ts';

const addExtras = (ser: string): string => {
	const floorMap = deserialize(ser);
	const floor = floorMap.get(1);
	for (const el of ['elerium', 'dilithium']) {
		floor.gen.push(el);
		floor.micro.push(el);
	}
	return serialize(floorMap);
};

const main = (input: string): number => {
	const floorMap = addExtras(parseInput(input));
	return moveItems(floorMap);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
