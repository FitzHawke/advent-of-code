const vowels = new Set('aeiou');
const badPairs = new Set().add('ab').add('cd').add('pq').add('xy');

const isNiceString = (word: string): boolean => {
	let vowelCount = 0;
	let foundDup = false;
	if (vowels.has(word[0])) vowelCount++;
	for (let i = 1; i < word.length; i++) {
		if (vowels.has(word[i])) vowelCount++;
		if (!foundDup && word[i] === word[i - 1]) foundDup = true;
		if (badPairs.has(word[i - 1] + word[i])) return false;
	}
	if (foundDup && vowelCount >= 3) return true;
	return false;
};

const main = (input: string): number => {
	let niceCount = 0;
	for (const string of input.split('\n')) {
		if (isNiceString(string)) niceCount++;
	}
	return niceCount;
};

export default function (input: string): number {
	console.log("\nDay 05: Doesn't He Have Intern-Elves For This?\nPart A");
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
