const main = (input: string): number => {
  return 0;
};

export default function (input: string): number {
  console.log('\nDay ##: Title\nPart B');
  const startTime = new Date();
  const result = main(input);
  console.log(`Time elapsed: ${new Date().valueOf() - startTime.valueOf()}ms`);
  return result;
}
