# Advent of Code Solutions

This repository contains my TypeScript solutions to the Advent of Code challenges. Each day's folder includes the code that was used to solve the respective challenge along with the test cases. Fair warning, quality varies widely between different solutions as this is purely for fun and learning.

## Usage

#### Test Solutions

To run a specific day's solution, copy the example and your test input into example.txt and input.txt respectively, then run the following:

```bash

pnpm install
pnpm test 2023/day01

```

Replace 2023 and day01 with the appropriate date and edit the testing file with the solutions for your particular input.

#### New solution

To set up a problem for a new day, ensure you have [aoc-cli](https://github.com/scarvalhojr/aoc-cli) installed and run

```bash

pnpm install
bash newDay.sh 2023 1

```

where 2023 is the year and 1 is the day number.

## Folder Structure

The repository structure is organized by year and days:

```css

 2023
 ├── day01
 │   ├── part1.ts
 │   ├── part2.ts
 │   ├── index.test.ts
 │   ├── README.md
 │   ├── example.txt*
 │   ├── input.txt*
 │   └── puzzle.md*
 └── ...

(*) gitignored -- we do not have permission to redistibute either the puzzle text or specific inputs

```

## License

This project is licensed under the MIT License.
