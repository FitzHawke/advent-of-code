export const parseInput = (input: string): number[][] => {
	const lines = input.trim().split('\n');
	return lines.map((e) => e.split(' ').map(Number));
};

export const testReport = (report: number[]): boolean => {
	let dir = Math.sign(report[1] - report[0]);
	let safe = true;

	for (let i = 1; i < report.length; i++) {
		const diff = report[i] - report[i - 1];
		if (Math.sign(diff) !== dir) {
			safe = false;
			break;
		}

		if (Math.abs(diff) > 3 || Math.abs(diff) < 1) {
			safe = false;
			break;
		}
	}
	return safe;
};

const main = (input: string): number => {
	const reports = parseInput(input);
	let safeReports = 0;

	for (const report of reports) {
		if (testReport(report)) safeReports++;
	}
	return safeReports;
};

export default function (input: string, title: string): number {
	console.log(`\nDay 02: ${title}\nPart A`);
	const startTime = new Date();
	const result = main(input);
	console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
	return result;
}
