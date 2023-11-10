// https://www.acmicpc.net/problem/12871
// 무한 문자열
// 실버 5
// 수학, 문자열
// 231110
// ---------------------------------------
// 추가 테스트 케이스
// ababab
// abab
// ---------------------------------------
/**
 * 최대 공약수
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
}

/**
 * 최소 공배수
 */
function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

function compareStr(str1, str2) {
  const lcmLength = lcm(str1.length, str2.length);
  return str1.repeat(parseInt(lcmLength / str1.length)) ===
    str2.repeat(parseInt(lcmLength / str2.length))
    ? "1"
    : "0";
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
  const [str1, str2] = inputString.trim().split("\n");

  console.log(compareStr(str1, str2));
}
