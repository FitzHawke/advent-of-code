import { parseInput, testReport } from './partA.js';

const main = (input: string): number => {
	const reports = parseInput(input);
	let safeReports = 0;

	for (const report of reports) {
		if (testReport(report)) safeReports++;
		else {
			for (let i = 0; i < report.length; i++) {
				const filtered = report.filter((_, index) => i !== index);
				if (testReport(filtered)) {
					safeReports++;
					break;
				}
			}
		}
	}
	return safeReports;
};

export default function (input: string, title: string): number {
	console.log(`\nDay 02: ${title}\nPart B`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
