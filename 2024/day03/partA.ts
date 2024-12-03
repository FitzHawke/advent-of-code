export const parseInput = (input: string): string => {
	return input.trim().split('\n').join('');
};

export const testInstructions = (instructionSet:string, alwaysRun:boolean):number => {
	const test = ['m', 'u', 'l', '(', '#', ',', '#', ')'];
	let instructions = 0;
	let goTime = true;

	for (let i = 0; i < instructionSet.length; i++) {

		if (!alwaysRun && instructionSet[i] === 'd') {
			if (instructionSet.slice(i,i+4) === 'do()') goTime = true;
			if (instructionSet.slice(i,i+7) === "don't()") goTime = false;
		}

		if (instructionSet[i] === 'm' && (goTime || alwaysRun)) {
			let nums:number[] = [];
			for (let j = 0; j < test.length; j++) {
				const cur = instructionSet[i+j]
				if (cur !== test[j] && test[j]!=='#') break;
				if (test[j] === '#' && isNaN(Number(cur))) break;

				if (test[j] === '#') {
					let curNum = '';
					for (let k = 0; k <= 3 ; k++) {
						let testNum = instructionSet[i+j+k]
						if (!isNaN(Number(testNum)) && k !== 3) curNum += testNum;
						else {
							i += curNum.length - 1
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
}

const main = (input: string): number => {
	const instructionSet = parseInput(input);
	return testInstructions(instructionSet, true)
};

export default function (input: string, title: string): number {
	console.log(`\nDay 03: ${title}\nPart A`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
