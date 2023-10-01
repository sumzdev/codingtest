// https://www.acmicpc.net/problem/6443
// 골드 5
// 애너그램
// 231001

// ---------------------------------------
// 시도 1) 시간초과 - backtracking result Set 사용
// 시도 2) 중복 조건 추가

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
  const [N, ...input] = inputString.trim().split("\n");

  let cnt = -1;
  let result = "";
  while (++cnt < N) {
    const str = input[cnt];
    const anagramList = getAnagramList(str);
    result += anagramList + "\n";
  }
  console.log(result.trim());
}
// ---------------------------------------
function getAnagramList(str) {
  const charList = str.split("").sort().join("");
  // 시도 1 - set 사용
  const result = [];
  let check = Array.from({ length: str.length }).fill(false);
  let anagram = "";

  const backtracking = (cursor) => {
    if (cursor === charList.length) {
      result.push(anagram);
      // console.log("[anagram]", anagram);
      return;
    }
    for (let i = 0; i < charList.length; i += 1) {
      if (check[i]) continue;

      // 시도 2 - 중복 조건 추가
      if (i > 0 && charList[i - 1] === charList[i] && !check[i - 1]) continue;

      check[i] = true;
      anagram += charList[i];
      backtracking(cursor + 1);
      anagram = anagram.substring(0, anagram.length - 1);
      check[i] = false;
    }
  };
  backtracking(0);
  return result.join("\n");
}
