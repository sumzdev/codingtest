// https://www.acmicpc.net/problem/16987
// 골드 5
// 계란으로 계란치기
// 230926

// 더 좋은 답안 : https://www.acmicpc.net/source/65604270

// 계란이 3개인 경우 - 계란 깨는 모든 조합
// 1) 1/2 2/1 3/1
// 2) 1/2 2/1 3/2
// 3) 1/2 2/3 3/1
// 4) 1/2 2/3 3/2
// 5) 1/3 2/1 3/1
// 6) 1/3 2/1 3/2
// 7) 1/3 2/3 3/1
// 8) 1/3 2/3 3/2

// ----제출-----------------------------------
const fs = require("fs");
// ------------------------------------------

/**
 * 깨려는 계란이 깨져있는 경우 다음으로 (cursor + 1)
 * 치려는 계란이 깨져있는 경우 다음으로 반복문 조건
 *
 * @param {number[]} powerList - 계란 무게 목록
 * @param {number[]} restPowerList - 계란 남은 내구도 목록
 * @param {number} cursor 현재 연산중인 numList의 커서
 */
function permutation(powerList, restPowerList, cursor = 0) {
  // console.log("#", `[${cursor}]`, restPowerList, restPowerList[cursor]);

  if (cursor === powerList.length) {
    // console.log("---end", `[${cursor}]`, restPowerList);
    // 깨진 계란(0이하인) 수 구하기
    return restPowerList.filter((v) => v <= 0).length;
  }

  if (restPowerList[cursor] <= 0) {
    const res = permutation(powerList, [...restPowerList], cursor + 1);
    // console.log("---res", `[${cursor}]`, restPowerList, res);
    return res;
  }

  const result = [];
  let check = false;

  for (let i = 0; i < powerList.length; i += 1) {
    if (i === cursor) continue;
    if (restPowerList[i] <= 0) continue;

    check = true;

    const nextPowerList = [...restPowerList];
    nextPowerList[i] = nextPowerList[i] - powerList[cursor];
    nextPowerList[cursor] = nextPowerList[cursor] - powerList[i];
    // console.log("--c/i", `[${cursor}]`, i, nextPowerList);

    const res = permutation(powerList, nextPowerList, cursor + 1);
    if (res === powerList.length) {
      // powerList.length가 최대 값이므로 더 확인하지 않고 바로 리턴
      return res;
    }

    result.push(res);
  }

  if (!check) return restPowerList.filter((v) => v <= 0).length;
  // console.log(result);

  return Math.max(...result, 0);
}
// -----제출----------------------------------
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
  let [N, ...input] = inputString.trim().split("\n");
  // N = +N;

  let restPowerList = [];
  let powerList = [];

  input.forEach((v) => {
    const [restPower, power] = v.split(" ").map(Number);
    restPowerList.push(restPower);
    powerList.push(power);
  });
  // console.log(restPowerList, powerList);

  const resultList = permutation(powerList, restPowerList);
  // console.log("----");
  console.log(resultList);

  // const max = resultList;
}
