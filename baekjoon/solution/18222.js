// https://www.acmicpc.net/problem/18222
// 투에-모스 문자열
// 실버 2
// 분할 정복
// 231004

// ---------------------------------------
// 0 2  4    8    12   16   20   24   28
// 0110 1001 1001 0110 1001 0110 0110 1001
// ---- **** ---- ---- **** **** **** ****

// 32   36   40   44   48   52   56   60
// 1001 0110 0110 1001 0110 1001 1001 0110
// ---- ---- ---- ---- ---- ---- ---- ----

// 64   68   72   76   80   84   88   92
// 1001 0110 0110 1001 0110 1001 1001 0110
// **** **** **** **** **** **** **** ****

// 96   100  104  108  112  116  120  124
// 0110 1001 1001 0110 1001 0110 0110 1001
// **** **** **** **** **** **** **** ****

// *:반전 / -:그대로
// 2의 거듭제곱수 중에 지수가 2 이상인 경우 짝수이면 반전, 홀수이면 그대로이다.
// 따라서 반전되는 수를 만날 때마다 flag를 반전하여 결과를 반전시킬 여부를 계산하였다.

// ---------------------------------------
// [좋은 답안] https://www.acmicpc.net/source/38755985
// const TWO = BigInt(2);
// function solution(strNum) {
//   let answer = BigInt(0);
//   let num = BigInt(strNum) - 1n;
//   console.log(answer, num);

//   while (num) {
//     answer += num % TWO;
//     num = num >> 1n;
//     console.log(answer, num);
//   }

//   console.log("res", answer % TWO);
//   return `${answer % TWO}`;
// }

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

function getNearestPowerOf2(bigintNum) {
  let n = 1n;
  let pow = 0n;
  while (n * 2n <= bigintNum) {
    n *= 2n;
    pow += 1n;
  }
  return [pow, n];
}

function getNthThueMorseSequence(strNum) {
  let num = BigInt(strNum) - 1n;
  const ThueMorseSequence = {
    [0n]: "0",
    [1n]: "1",
    [2n]: "1",
    [3n]: "0",
  };
  if (num <= 3n) return ThueMorseSequence[num];

  let pow, nearestPowerOf2;
  let flag = false;

  while (num > 3n) {
    [pow, nearestPowerOf2] = getNearestPowerOf2(num);
    if (pow % 2n === 0n) flag = !flag;
    num = nearestPowerOf2 - 1n - (num - nearestPowerOf2);
    // console.log(">", num, nearestPowerOf2, pow, flag);
  }

  return flag
    ? ThueMorseSequence[num] === "1"
      ? "0"
      : "1"
    : ThueMorseSequence[num];
}

// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const num = fs.readFileSync(filePath).toString();
  console.log(getNthThueMorseSequence(num));
  // console.log(solution(num));
}
