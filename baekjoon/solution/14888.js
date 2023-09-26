// https://www.acmicpc.net/problem/14888
// 실버 1
// 연산자 끼워넣기
// 230926

// -0 -> 0으로 !!

// ----제출-----------------------------------
const fs = require("fs");
// ------------------------------------------

/**
 * 연산자 목록 순열 만들고 결과 배열 반환
 *
 * @param {number[]} numList
 * @param {{0: number, 1: number, 2:number, 3:number}} operatorList - {0:덧셈, 1:뺄셈, 2:곱셈, 3:나눗셈} 연산자 남은 개수
 * @param {number} prev 이전 연산의 결과
 * @param {number} cursor 현재 연산중인 numList의 커서
 */
function permutation(numList, operatorList, prev, cursor = 1) {
  // console.log("[call]", cursor, operatorList, prev);
  if (cursor === numList.length) return [prev];

  const result = [];
  let tmp;

  const curValues = [
    prev + numList[cursor],
    prev - numList[cursor],
    parseInt(prev * numList[cursor]),
    (tmp = prev / numList[cursor]) < 0 ? Math.ceil(tmp) : Math.floor(tmp),
  ];

  for (let i = 0; i < 4; i += 1) {
    if (operatorList[i] > 0) {
      const res = permutation(
        numList,
        { ...operatorList, [i]: operatorList[i] - 1 },
        curValues[i],
        cursor + 1
      );
      result.push(...res);
    }
  }
  // console.log("[out]", cursor, operatorList, prev, result);
  return result;
}
// -----제출----------------------------------
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
  const input = inputString.trim().split("\n");

  // const N = +input[0];
  const numList = input[1].split(" ").map(Number);
  const operatorList = Object.fromEntries(
    input[2].split(" ").map((v, i) => [i, +v])
  );
  // console.log(N, numList, operatorList);

  const resultList = permutation(numList, operatorList, numList[0]);
  // console.log(resultList);

  const max = Math.max(...resultList);
  const min = Math.min(...resultList);
  console.log(max === -0 ? "0" : max);
  console.log(min === -0 ? "0" : min);
}
