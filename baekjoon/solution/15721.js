// https://www.acmicpc.net/problem/15721
// 번데기
// 실버 5
// 완전 탐색
// 231016

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function game(A, T, slogan) {
  let n = 2;
  let str = "0101" + "0".repeat(n) + "1".repeat(n);
  while (T > str.length / 2) {
    n += 1;
    str += "0101" + "0".repeat(n) + "1".repeat(n);
  }
  // console.log(n, str);

  let cnt = 0;
  let peopleIdx = 0;
  for (let char of str) {
    // console.log(char, slogan);
    if (+char === slogan) cnt += 1;
    peopleIdx += 1;
    if (cnt === T) return peopleIdx - 1;

    if (peopleIdx === A) peopleIdx = 0;
  }
  return peopleIdx;
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
  const [A, T, slogan] = inputString.trim().split("\n").map(Number);
  console.log(game(A, T, slogan));
}
