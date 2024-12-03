export const parseInput = (input: string): string => {
	return input.trim().split('\n').join('');
};

const main = (input: string): number => {
	const instructionSet = parseInput(input);
	const test = ['m', 'u', 'l', '(', '#', ',', '#', ')'];
	let instructions = 0;

	for (let i = 0; i < instructionSet.length; i++) {
		if (instructionSet[i] === 'm') {
			let offset = 0;
			let nums:number[] = [];
			for (let j = 0; j < test.length; j++) {
				const cur = instructionSet[i+j+offset]
				if (cur !== test[j] && test[j]!=='#') break;
				if (test[j] === '#' && isNaN(Number(cur))) break;

				if (test[j] === '#') {
					let curNum = '';
					for (let k = 0; k <= 3 ; k++) {
						let testNum = instructionSet[i+j+k+offset]
						if (!isNaN(Number(testNum))) curNum += testNum;
						else {
							offset += curNum.length - 1
							nums.push(Number(curNum))
							break;
						}
					}
				}

				if (test[j] === ')' && cur === test[j]){
					console.log(nums)
					instructions += nums[0] * nums[1];
				}
			}
		}
	}

	return instructions;
};

export default function (input: string, title: string): number {
	console.log(`\nDay 03: ${title}\nPart A`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
