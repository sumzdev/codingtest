// https://www.acmicpc.net/problem/20437
// 골드 5
// 문자열 게임 2
// 230921

// ---------------------------------------
// const fs = require("fs");
// const isTest = process.platform !== "linux";
// const inputFilePaths = !isTest
//   ? ["/dev/stdin"]
//   : [
//       "./input1.txt",
//       "./input2.txt",
//       // "./input3.txt",
//     ];
// for (let filePath of inputFilePaths) {
//   if (isTest) console.log("==============", filePath);
//   const inputString = fs.readFileSync(filePath).toString();
//   const [T, ...strList] = inputString.trim().split("\n");

//   let result = "";

//   let str = "";
//   for (const inputLine of strList) {
//     if (str !== "") {
//       result += stringGame({ N: +inputLine, str }) + "\n";
//       str = "";
//       continue;
//     }
//     str = inputLine;
//   }
//   console.log(result.trim());
// }

// ----제출-----------------------------------
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ---------------------------------------

function stringGame({ N, str }) {
  const charList = str.split("");
  const cntChar = {};

  let minLen = 10001;
  let maxLen = -1;

  charList.forEach((char, i) => {
    cntChar[char] = !cntChar[char] ? [i] : [...cntChar[char], i];

    if (cntChar[char].length >= N) {
      const len = i - cntChar[char].at(-1 * N);
      minLen = Math.min(minLen, len);
      maxLen = Math.max(maxLen, len);
      // console.log(cntChar[char], minLen, maxLen);
    }
  });
  // console.log(cntChar);
  // console.log(minLen, maxLen);

  return maxLen === -1 ? "-1" : `${minLen + 1} ${maxLen + 1}`;
}

// -----제출----------------------------------
rl.question("", (inputLine) => {
  // const T = +inputLine;
  let result = "";
  let cnt = 0;
  let str = "";

  rl.on("line", (inputLine) => {
    if (inputLine === "") rl.close();

    if (cnt % 2 == 1) {
      result += stringGame({ N: +inputLine, str }) + "\n";
    } else {
      str = inputLine;
    }
    cnt += 1;
  }).on("close", function () {
    console.log(result.trim());
    process.exit();
  });
});
