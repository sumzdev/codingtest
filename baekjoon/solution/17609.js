// https://www.acmicpc.net/problem/17609
// 골드 5
// 회문
// 230921

// ---------------------------------------
// 테스트 케이스
// 21
// a
// ab
// aa
// aba
// aab
// baa
// abc
// abcdefedcba
// zabcdeedcba
// azbcdeedcba
// abzcdeedcba
// abczdeedcba
// abcdzeedcba
// abcdezedcba
// abcdeezdcba
// abcdeedzcba
// abcdeedczba
// abcdeedcbza
// abcdeedcbaz
// abcdeedcbzz
// zzabcdeedcb

// 출처 : https://www.acmicpc.net/board/view/83790
// 3
// ppbpppb
// aabcdeddcba
// aabab

// ---------------------------------------

const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
    ];
for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...strList] = inputString.trim().split("\n");

  let result = "";
  strList.forEach((inputLine) => {
    console.log("----", inputLine, inputLine.length);
    console.log(">>", isPalindrome(inputLine));
    // result += isPalindrome(inputLine) + "\n";
  });
  console.log(result.trim());
}

// ----제출-----------------------------------
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });

// ---------------------------------------

function isPalindrome(str) {
  const charList = str.split("");
  const mid = charList.length >> 1;

  let i = 0;
  let j = charList.length - 1;

  let checkPlusI = false;
  let checkMinusJ = false;
  let nextI, nextJ;

  while (
    i <= mid &&
    j >= charList.length - mid - (!checkMinusJ ? 0 : 1) &&
    i !== j
  ) {
    // console.log(i, j, mid, charList[i] === charList[j]);

    if (charList[i] !== charList[j]) {
      if (!checkPlusI) {
        i += 1;
        checkPlusI = true;
        [nextI, nextJ] = [i - 1, j - 1];
        // console.log("i+1", i, j);
        continue;
      } else if (!checkMinusJ) {
        [i, j] = [nextI, nextJ];
        // console.log("j-1", i, j);
        checkMinusJ = true;
        continue;
      }
      return 2;
    }

    i += 1;
    j -= 1;
  }
  // console.log("check", i, j, mid);
  // console.log("check", i < mid, j >= charList.length - mid, i !== j);

  return !checkPlusI && !checkMinusJ ? 0 : 1;
}
// -----제출----------------------------------
// // let N;
// let result = "";
// rl.question("", (inputLine) => {
//   // N = +inputLine;
//   rl.on("line", (inputLine) => {
//     if (inputLine === "") rl.close();

//     result += isPalindrome(inputLine) + "\n";
//   }).on("close", function () {
//     console.log(result.trim());
//     process.exit();
//   });
// });

// ------------------------------------------------ 시도 (1)
// [메모리 초과]
// function isPalindrome(str) {
//   // console.log(str, str.split("").reverse().join(""));
//   if (str === str.split("").reverse().join("")) return 0;

//   for (let i = 0; i < str.length; i += 1) {
//     const clone = str.split("");
//     clone.splice(i, 1);
//     // console.log(clone.reverse().join(""), clone.join(""));

//     if (clone.join("") === clone.reverse().join("")) return 1;
//   }

//   return 2;
// }

// ---------------------------------------
// ex) 0 1 2 3 4 5 6 7 8 9 10

// // 0
// // i=0, j=len-1 ; i++, j--  => 0
// [ 0] 1 2 3 4 |5 6 7 8 9 10
// [10] 9 8 7 6 |5 4 3 2 1 0

// # !== [0, 10]
// // [0] i+1
// [ 1] 2 3 4 5 |6 7 8 9 10
// [10] 9 8 7 6 |5 4 3 2 1

// // [10] j-1
// [ 0] 1 2 3 4 |5 6 7 8 9
// [ 9] 8 7 6 5 |4 3 2 1 0

// # === [0, 10] && !== [1, 9]
// // [1] i+1
//  0 [2] 3 4 5 |6 7 8 9 10
// 10 [9] 8 7 6 |5 4 3 2 0

// // [9] j-1
//  0 [1] 2 3 4 |5 6 7 8 10
// 10 [8] 7 6 5 |4 3 2 1 0

// # === [0, 10] [1, 9] && !== [2, 8]
// // [2] i+1
//  0 1 [3] 4 5 |6 7 8 9 10
// 10 9 [8] 7 6 |5 4 3 2 1

// // [8] j-1
//  0 1 [2] 3 4 |5 6 7 9 10
// 10 9 [7] 6 5 |4 3 2 1 0

// # === [0, 10] [1, 9] [2, 8] && !== [3, 7]
// // [3] i+1
//  0 1 2 [4] 5 |6 7 8 9 10
// 10 9 8 [7] 6 |5 4 2 1 0

// //[7] j-1
//  0 1 2 [3] 4 |5 6 8 9 10
// 10 9 8 [6] 5 |4 3 2 1 0

// # === [0, 10] [1, 9] [2, 8] [3, 7] && !== [4, 6]
// // [4] i+1
//  0 1 2 3 [5] |6 7 8 9 10
// 10 9 8 7 [6] |5 4 3 1 0

// // [6] j-1
//  0 1 2 3 [4] |5 7 8 9 10
// 10 9 8 7 [5] |4 3 2 1 0

// # ================================ 0
// // [5 = 0]
//  0 1 2 3 [4] |6 7 8 9 10
// 10 9 8 7 [6] |4 3 2 1 0
