import crypto from 'node:crypto';

export const parseInput = (input: string): string => {
	return input.trimEnd();
};

export const md5Hash = (str: string) =>
	crypto.createHash('md5').update(str).digest('hex');

const crackPass = (str: string): string => {
	const code: string[] = [];
	let i = 0;

	while (code.length < 8) {
		const testval = `${str}${i}`;
		const hash = md5Hash(testval);
		if (hash.startsWith('00000')) code.push(hash[5]);

		i++;
	}

	return code.join('');
};

const main = (input: string): string => {
	const doorID = parseInput(input);
	return crackPass(doorID);
};

export default function (input: string, title: string): string {
	console.log(`\n${title}\nPart 1`);
	console.time('Time elapsed');
	const result = main(input);
	console.timeEnd('Time elapsed');
	return result;
}
