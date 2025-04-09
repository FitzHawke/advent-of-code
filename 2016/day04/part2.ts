import { parseInput, RoomType, testRoom } from './part1.ts';

const findRoom = (rooms: RoomType[], name: string): number => {
	for (const room of rooms) {
		if (testRoom(room)) {
			let decrypted: string[] = [];
			for (const letter of room.encrypt) {
				if (letter === '-') {
					decrypted.push(' ');
					continue;
				}

				decrypted.push(
					String.fromCharCode(
						((letter.charCodeAt(0) - 97 + room.ID) % 26) + 97,
					),
				);
			}
			if (decrypted.join('') === name) return room.ID;
		}
	}

	return 0;
};

const main = (input: string): number => {
	const rooms = parseInput(input);
	return findRoom(rooms, 'northpole object storage');
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 2`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
