import { defineConfig } from 'vitest/config';

export default defineConfig({
	base: './',
	test: {
		exclude: [
			'node_modules',
			'dist',
			'.idea',
			'.git',
			'.cache',
			'**/template/**',
		],
		benchmark: {
			exclude: [
				'node_modules',
				'dist',
				'.idea',
				'.git',
				'.cache',
				'**/template/**',
			],
		},
	},
});
