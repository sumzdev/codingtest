// https://www.acmicpc.net/problem/4659
// 실버 5
// 비밀번호 발음하기
// 231003

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

const VOWELS = ["a", "e", "i", "o", "u"];
// 1. 모음(a, e, i, o, u) 중 하나를 반드시 포함해야 한다.
// 2. 모음이 연속 3개 오면 X
// 3. 자음이 연속 3개 오면 X
// 4. 같은 글자 연속 두 번 X (예외: ee, oo)

function checkPassword(str) {
  const check = str.split("");
  let checkVowel = false;
  let cursor = -1;

  while (++cursor < str.length) {
    if (VOWELS.includes(str[cursor])) {
      checkVowel = true;
    } else {
      check[cursor] = false;
    }

    // ee, oo가 아닌 같은 글자 연속 두 번
    if (
      cursor >= 1 &&
      str[cursor - 1] === str[cursor] &&
      str[cursor] !== "e" &&
      str[cursor] !== "o"
    ) {
      return false;
    }

    // 모음 또는 자음 연속 세범
    if (
      cursor >= 2 &&
      ((check[cursor] && check[cursor - 1] && check[cursor - 2]) ||
        (!check[cursor] && !check[cursor - 1] && !check[cursor - 2]))
    ) {
      return false;
    }
  }
  return checkVowel;
}
// ---------------------------------------
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
  input.pop();
  const result = input.map(
    (str) => `<${str}> is ${checkPassword(str) ? "" : "not "}acceptable.`
  );
  console.log(result.join("\n").trim());
}
