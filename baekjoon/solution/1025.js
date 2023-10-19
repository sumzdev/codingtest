// https://www.acmicpc.net/problem/1025
// 제곱수 찾기
// 골드 5
// 완전 탐색
// 231019

// ---------------------------------------
// 추가 테스트
// 1 1
// 1
// ->1
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function checkSqrt(number) {
  // console.log(number);
  const sqrt = Math.sqrt(number);
  return sqrt === parseInt(sqrt);
}

/**
 *
 * @param {number} numOfRow 행의 수 1 <= N <= 9
 * @param {number} numOfCol 열의 수 1 <= N <= 9
 * @param {number[][]} numberList 0 <= N <= 9
 */
function findMaxSqrt(numOfRow, numOfCol, numberList) {
  // console.log(numOfRow, numOfCol, numberList);
  let maxSqrt = -1;

  if (numOfRow === 1 && numOfCol === 1) {
    if (checkSqrt(numberList[0][0])) maxSqrt = numberList[0][0];
    return maxSqrt;
  }

  const check = (sqrtStr) => {
    if (checkSqrt(+sqrtStr)) maxSqrt = Math.max(maxSqrt, +sqrtStr);
    const reversedSqrt = +sqrtStr.split("").reverse().join("");
    if (checkSqrt(reversedSqrt)) maxSqrt = Math.max(maxSqrt, reversedSqrt);
  };

  const checkLoop = (startRi, startCi, rd, cd) => {
    // console.log(">", startRi, startCi, rd, cd);
    let sqrt = "";
    for (
      let [ri, ci] = [startRi, startCi];
      ri < numOfRow && ci < numOfCol;
      ri += rd, ci += cd
    ) {
      sqrt += numberList[ri][ci];
      check(sqrt);
    }

    sqrt = "";
    for (
      let [ri, ci] = [startRi, startCi];
      ri >= 0 && ci < numOfCol;
      ri -= rd, ci += cd
    ) {
      sqrt += numberList[ri][ci];
      check(sqrt);
    }

    sqrt = "";
    for (
      let [ri, ci] = [startRi, startCi];
      ri < numOfRow && ci >= 0;
      ri += rd, ci -= cd
    ) {
      sqrt += numberList[ri][ci];
      check(sqrt);
    }

    sqrt = "";
    for (
      let [ri, ci] = [startRi, startCi];
      ri >= 0 && ci >= 0;
      ri -= rd, ci -= cd
    ) {
      sqrt += numberList[ri][ci];
      check(sqrt);
    }
  };

  for (let startRi = 0; startRi < numOfRow; startRi += 1) {
    for (let startCi = 0; startCi < numOfCol; startCi += 1) {
      // 등차수열의 공차 - 행
      for (let rd = 0; rd < numOfRow; rd += 1) {
        // 등차수열의 공차 - 열
        for (let cd = 0; cd < numOfCol; cd += 1) {
          if (rd === 0 && cd === 0) continue;
          // console.log(">", rd, cd);
          checkLoop(startRi, startCi, rd, cd);
        }
      }
    }
  }

  return maxSqrt;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, ...numberList] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);
  console.log(
    findMaxSqrt(
      N,
      M,
      numberList.map((v) => v.split("").map(Number))
    )
  );
}
