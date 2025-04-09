export type RoomType = {
	encrypt: string;
	ID: number;
	checksum: string;
};

export const parseInput = (input: string): RoomType[] => {
	return input
		.trimEnd()
		.split('\n')
		.map((cur) => {
			const partial = cur.split('-');
			const iDCheck = partial.pop();
			const [strID, check] = iDCheck.split(']')[0].split('[');
			return { encrypt: partial.join('-'), ID: Number(strID), checksum: check };
		});
};

export const testRoom = (room: RoomType): boolean => {
	const hash = {} as { [key: string]: number };

	for (const letter of room.encrypt) {
		if (letter === '-') continue;

		if (hash[letter]) hash[letter]++;
		else hash[letter] = 1;
	}

	const arr: [string, number][] = [];

	for (const key in hash) {
		arr.push([key, hash[key]]);
	}

	arr.sort((a, b) => {
		if (a[1] === b[1]) return a[0].charCodeAt(0) - b[0].charCodeAt(0);
		else return b[1] - a[1];
	});

	for (let i = 0; i < room.checksum.length; i++) {
		if (room.checksum[i] !== arr[i][0]) return false;
	}

	return true;
};

const countRooms = (rooms: RoomType[]): number => {
	let count = 0;

	for (const room of rooms) {
		if (testRoom(room)) count += room.ID;
	}

	return count;
};

const main = (input: string): number => {
	const rooms = parseInput(input);
	return countRooms(rooms);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
