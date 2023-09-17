// https://www.acmicpc.net/problem/1758
// 실버 4
// 알바생 강호

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      "./input4.txt",
      "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");

  run({ N, input: input.map(Number) });
}

function sum(arr) {
  return arr.reduce((prev, cur) => prev + cur, 0);
}

function run({ N, input }) {
  // console.log(input);

  const tip = input
    .sort((a, b) => b - a)
    .map((v, i) => {
      const minTip = v - i;
      return minTip > 0 ? minTip : 0;
    });
  // console.log(tip);

  console.log(sum(tip));
}
