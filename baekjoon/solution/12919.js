// https://www.acmicpc.net/problem/12919
// A와 B 2
// 골드 5
// 완전 탐색
// 231017

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

/**
 * (S의 길이 < T의 길이)
 * @param {string} str : 1 <= len <= 49
 * @param {string} targetStr : 2 <= len <= 50
 * @returns 0(불가능) 또는 1(가능)
 */
function checkMakeStr(str, targetStr) {
  let result = 0;
  let reverseTargetStr = targetStr.split("").reverse().join("");

  const makeStr = (str) => {
    // console.log(str);

    if (str.length === targetStr.length) {
      if (str === targetStr) result = 1;
      return;
    }

    const strA = str + "A";
    if (targetStr.includes(strA) || reverseTargetStr.includes(strA)) {
      makeStr(strA);
    }

    const strB = "B" + str.split("").reverse().join("");
    if (targetStr.includes(strB) || reverseTargetStr.includes(strB)) {
      makeStr(strB);
    }
  };
  makeStr(str);

  return result;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 1
      "./input2.txt", // 1
      "./input3.txt", // 0
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [str, targetStr] = inputString.trim().split("\n");
  console.log(checkMakeStr(str, targetStr));
}
