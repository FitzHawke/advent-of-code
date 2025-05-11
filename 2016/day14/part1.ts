import crypto from 'node:crypto';

export const md5Hash = (str: string) =>
	crypto.createHash('md5').update(str).digest('hex');

export const parseInput = (input: string): string => {
	return input.trimEnd();
};

export const find64Key = (salt: string, hashFunc: Function): number => {
	const seen = new Map<string, string>();
	const keys: string[] = [];
	let i = -1;

	const verifyKey = (val: string, iter: number) => {
		for (let j = 1; j <= 1000; j++) {
			const tstSalt = `${salt}${j + iter}`;
			if (!seen.has(tstSalt)) seen.set(tstSalt, hashFunc(tstSalt));

			const hashed = seen.get(tstSalt);
			const testStr = `${val}${val}${val}${val}${val}`;

			if (hashed.includes(testStr)) {
				keys.push(hashed);
				return true;
			}
		}
		return false;
	};

	while (keys.length < 64) {
		i++;
		const newSalt = `${salt}${i}`;

		if (!seen.has(newSalt)) seen.set(newSalt, hashFunc(newSalt));

		const hashed = seen.get(newSalt);
		let found: string = '';
		for (let j = 2; j < hashed.length; j++) {
			if (hashed[j] === hashed[j - 1] && hashed[j - 1] === hashed[j - 2]) {
				found = hashed[j];
				break;
			}
		}
		if (found !== '') verifyKey(found, i);
	}

	return i;
};

const main = (input: string): number => {
	const salt = parseInput(input);
	const hashFunc = (str: string) => md5Hash(str);
	return find64Key(salt, hashFunc);
};

export default function (input: string, title: string): number {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
