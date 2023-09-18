// https://www.acmicpc.net/problem/20115
// 실버 3
// 에너지 드링크

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 18
      "./input2.txt", // 10
      // "./input3.txt",
      // "./input4.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function processInput(inputArr) {
  const [N, amountList] = inputArr;

  return {
    N: +N,
    amountList: amountList
      .split(" ")
      .sort((a, b) => b - a)
      .map(BigInt),
  };
}

function sum(arr) {
  return arr.reduce((prev, cur) => prev + cur, 0n);
}

function run(inputArr) {
  const { N, amountList } = processInput(inputArr);
  // console.log(N, amountList);

  const [f, ...rest] = amountList;
  const totalRest = sum(rest);
  const res = f + totalRest / 2n;
  const dicimalPart = totalRest % 2n;
  // console.log(dicimalPart, res, dicimalPart);

  console.log(`${res}${dicimalPart === 1n ? ".5" : ""}`);
}
