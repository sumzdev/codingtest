// https://www.acmicpc.net/problem/15927
// 골드 5
// 회문은 회문아니야!!
// 230927

// ---------------------------------------

// 1) 회문아니면 len
// 2) 회문이고 &&
// 2-1) 모두 같은 글자 아니면 len -1
// 2-2) 모두 같은 글자면 -1

// ---------------------------------------

const fs = require("fs");
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
  // const input = inputString.trim().split("\n");
  const input = inputString.trim();

  let result = -1;

  const palindrome = isPalindrome(input.split(""));

  if (!palindrome) {
    result = input.length;
  } else if (!isAllSameChar(input)) {
    result = input.length - 1;
  }
  console.log(result);
}
// ---------------------------------------
function isAllSameChar(str) {
  return str === str[0].repeat(str.length);
}

function isPalindrome(charList) {
  if (charList.length === 1) return true;

  const mid = charList.length >> 1;
  const minJ = charList.length % 2 == 0 ? mid - 1 : mid;

  let i = -1;
  let j = charList.length;

  let check = false;

  while (++i < mid && --j > minJ && (check = charList[i] === charList[j]));
  return check;
}
// ---------------------------------------
