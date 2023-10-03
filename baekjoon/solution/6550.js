// https://www.acmicpc.net/problem/6550
// 실버 5
// 부분 문자열
// 231003

// ---------------------------------------

const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  const testcases = input.map((v) => v.split(" "));
  const result = testcases.map((v) => isSubString(v));
  console.log(result.join("\n").trim());
}
// ---------------------------------------
function isSubString([substr, str]) {
  // console.log(substr, str);
  if (substr.length > str.length) return "No";
  if (substr.length === str.length) {
    if (substr === str) return "Yes";
    return "No";
  }

  const check = str.split("").map((_) => false);
  let cursor = 0;

  for (let i = 0; i < check.length; i++) {
    // console.log(cursor, substr[cursor], i, str[i]);
    if (substr[cursor] === str[i]) {
      cursor += 1;
      if (cursor === substr.length) return "Yes";
    }
  }
  return "No";
}
