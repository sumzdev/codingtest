// https://www.acmicpc.net/problem/1744
// 수 묶기
// 골드4
// 그리디
// 231117
// ---------------------------------------

function findMaxValue(numList) {
  let positiveNums = [];
  let negativeNums = [];
  let cntZero = 0;
  let cntOne = 0;

  numList
    .sort((a, b) => a - b)
    .forEach((v) => {
      if (v < 0) negativeNums.push(v);
      else if (v === 0) cntZero += 1;
      else if (v === 1) cntOne += 1;
      else positiveNums.push(v);
    });

  let max = 0;
  let n1, n2;
  while (negativeNums.length >= 2) {
    [n1, n2, ...negativeNums] = negativeNums;
    max += n1 * n2;
  }
  if (negativeNums.length > 0) {
    if (cntZero === 0) max += negativeNums[0];
  }
  max += cntOne;
  while (positiveNums.length >= 2) {
    n1 = positiveNums.pop();
    n2 = positiveNums.pop();
    max += n1 * n2;
  }
  max += positiveNums.length > 0 ? positiveNums[0] : 0;
  return max;
}

// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const input = fs.readFileSync(filePath);
  const [num, ...inputLine] = input.toString().trim().split("\n");

  console.log(findMaxValue(inputLine.map(Number)));
}
