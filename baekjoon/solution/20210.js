// https://www.acmicpc.net/problem/20210
// 골드 2
// 파일 탐색기
// 230922

// ----테스트-----------------------------------
// const fs = require("fs");
// ----제출-----------------------------------
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// 2 <= N <= 10000
// 문자열 길이 100이하 - 알파벳 대소문자 & 숫자
// 숫자 < 알파벳
// 숫자 : 앞에 0 더 작은 수 <
// Aa...Zz 순서

function naturalSort({ N, strList }) {
  const regexSplit = /[a-zA-Z]|\d+/g;

  const charOrder = {};
  "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz"
    .split("")
    .forEach((char, i) => {
      charOrder[char] = i + 1;
    });

  const compareFunc = (charList1, charList2) => {
    for (let i = 0; i < charList1.length; i += 1) {
      if (i >= charList2.length) return 1;

      if (charList1[i] === charList2[i]) continue;

      const char1Order = charOrder[charList1[i]];
      const char2Order = charOrder[charList2[i]];

      if (!char1Order || !char2Order) {
        // 둘 중 하나라도 숫자이면
        if (!!char2Order) {
          // char1을 숫자이고 char2는 숫자가 아닌경우
          return -1;
        } else if (!!char1Order) {
          // char1은 숫자가 아니고 cahr2는 숫자인 경우
          return 1;
        } else {
          // 둘다 숫자인 경우
          const diff = BigInt(charList1[i]) - BigInt(charList2[i]);

          // 같은 숫자이면 앞의 "0"이 더 많은게 뒷 순서
          if (diff === 0n) return charList1[i].length - charList2[i].length;
          // 숫자 크기 순
          return diff > 0n ? 1 : -1;
        }
      }

      return char1Order - char2Order;
    }
    return charList1.length - charList2.length;
  };

  const splittedList = strList
    .map((str) => str.match(regexSplit))
    .sort(compareFunc);

  const result = splittedList.map((v) => v.join("")).join("\n");
  return result;
}

// -----제출----------------------------------
rl.question("", (inputLine) => {
  const N = +inputLine;
  let cnt = 0;

  const strList = [];

  rl.on("line", (inputLine) => {
    if (cnt++ > N) rl.close();

    strList.push(inputLine.trim());
  }).on("close", function () {
    console.log(naturalSort({ N, strList }).trim());
    process.exit();
  });
});
// -----테스트-------------------------------------
// const isTest = process.platform !== "linux";
// const inputFilePaths = !isTest
//   ? ["/dev/stdin"]
//   : [
//       // "./input1.txt",
//       // "./input2.txt",
//       "./input3.txt",
//     ];

// for (let filePath of inputFilePaths) {
//   if (isTest) console.log("==============", filePath);
//   const inputString = fs.readFileSync(filePath).toString();
//   const [N, ...strList] = inputString.trim().split("\n");

//   console.log(naturalSort({ N: +N, strList }).trim());
// }
