// https://www.acmicpc.net/problem/18511
// 큰 수 구성하기
// 실버 5
// 완전 탐색
// 231017

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
/**
 *
 * @param {number} targetNum : 10 <= N <= 100,000,000
 * @param {number} lenOfNumberList : 1 <= len <= 3
 * @param {number[]} numberList
 *  - elem : 1 <= elem <= 9
 */
function makeMaxNumber(targetNumStr, lenOfNumberList, numberList) {
  // console.log(targetNumStr, lenOfNumberList, numberList);

  let maxNum = 0;

  const makeNumber = (numStr) => {
    if (numStr.length > targetNumStr.length) return;

    if (+numStr <= +targetNumStr) {
      maxNum = maxNum < +numStr ? numStr : maxNum;
    }

    for (const number of numberList) {
      makeNumber(numStr + number);
    }
  };
  makeNumber("");

  return maxNum;
}

// ---------------------------------------
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
  const inputString = fs.readFileSync(filePath).toString();
  const [N_Klen, kArr] = inputString.trim().split("\n");
  const [N, kLen] = N_Klen.split(" ");
  console.log(
    makeMaxNumber(
      N,
      +kLen,
      kArr
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b)
    )
  );
}
