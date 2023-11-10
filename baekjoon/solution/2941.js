// https://www.acmicpc.net/problem/2941
// 크로아티아 알파벳
// 실버 5
// 정규표현식
// 231110
// ---------------------------------------
function countCroatiaAlphabet(str) {
  return str.replace(/c=|c-|dz=|d-|lj|nj|s=|z=/g, "#").length;
}
// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  // const [info, ...testcase] = inputString.trim().split("\n");

  const str = inputString.trim();
  console.log(countCroatiaAlphabet(str));
}
