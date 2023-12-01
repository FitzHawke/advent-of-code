export default function (input: string, len: number = 4): number {
	for (let i = len; i < input.length; i++) {
		let set = new Set(input.slice(i - len, i));
		if (set.size === len) {
			return i;
		}
	}
	return -1; // none found
}
