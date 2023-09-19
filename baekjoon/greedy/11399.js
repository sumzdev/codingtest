// https://www.acmicpc.net/problem/11399
// 실버 4
// ATM

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");

  run({ N, input: input[0].split(" ").map(Number) });
}

function run({ N, input }) {
  // console.log(input);
  const res = input
    .sort((a, b) => a - b)
    .reduce(
      ([sum, prevSum], cur) => [sum + prevSum + cur, prevSum + cur],
      [0, 0]
    );

  console.log(res[0]);
}
