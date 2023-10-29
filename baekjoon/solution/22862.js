// https://www.acmicpc.net/problem/22862
// 가장 긴 짝수 연속한 부분 수열 (large)
// 골드 5
// 투 포인터
// 231029
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
/**
 * 최대 maxNumOfDel번 list의 원소를 삭제한 뒤 가장 긴 짝수 연속 부분 수열 구하기
 * @param {number} numOfList : 1 <= 1.000,000
 * @param {number} maxNumOfDel : 1 <= 100,000
 * @param {number[]} list : 1 <= item <= 10000000
 */
function findMaxEvenNum(numOfList, maxNumOfDel, list) {
  // const evenList = list.map((v) => v % 2 === 0);
  // 미리 짝수 판단 계산 안하는 것이 메모리 덜 차지하고 조금 더 빠름

  let left = 0;
  let right = 0;
  let cntOdd = 0;
  let maxNumOfEvenList = 0;

  while (right < numOfList) {
    let flag = false;
    while (list[right] % 2 === 1 && right < numOfList) {
      cntOdd += 1;
      right += 1;
      flag = true;
    }
    if (flag) right -= 1;

    while (list[right + 1] % 2 === 0) {
      right += 1;
    }

    while (cntOdd > maxNumOfDel && left <= right) {
      if (list[left] % 2 === 1) cntOdd -= 1;
      left += 1;
    }
    maxNumOfEvenList = Math.max(maxNumOfEvenList, right - left - cntOdd + 1);
    // console.log(left, right, cntOdd, right - left - cntOdd + 1);

    right += 1;
  }

  return maxNumOfEvenList;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
      "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, numbers] = inputString.trim().split("\n");
  const [numOfList, maxNumOfDel] = info.split(" ").map(Number);

  console.log(
    findMaxEvenNum(numOfList, maxNumOfDel, numbers.split(" ").map(Number))
  );
}
