import { readFileSync } from "fs";
import { resolve } from "path";
import partA from "./partA";
import partB from "./partB";

const day = "template"
const answers = {
  "ae": 0,
  "ai": 0,
  "be": 0,
  "bi": 0
}

const input = readFileSync(resolve(process.cwd(), day, 'input.txt')).toString();
const example = readFileSync(resolve(process.cwd(), day, 'example.txt')).toString();

describe('Part A', () => {
  it('should produce the correct value for example', () => {
    expect(partA(example)).toEqual(answers.ae)
  })
  it('should produce the correct value for input', () => {
    expect(partA(input)).toEqual(answers.ai)
  })
})

describe('Part B', () => {
  it('should produce the correct value for example', () => {
    expect(partB(example)).toEqual(answers.be)
  })
  it('should produce the correct value for input', () => {
    expect(partB(input)).toEqual(answers.bi)
  })
})