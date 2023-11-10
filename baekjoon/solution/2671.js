// https://www.acmicpc.net/problem/2671
// 잠수함식별
// 골드 5
// 문자열, 정규표현식
// 231110

// ---------------------------------------
function isSubmarine(sound) {
  // (100~1~|01)~
  let str = sound.split("").reverse().join("");
  // console.log("\n>>>", str);

  while (str) {
    // console.log(str);
    if (str.match(/^1{1,}0{2,}1/)) {
      str = str.replace(/^1{1,}0{2,}1/, "");
      // console.log("(1)", str);
    } else if (str.match(/^10/)) {
      str = str.replace(/^10/, "");
      // console.log("(2)", str);
    } else {
      return "NOISE";
    }
  }
  return "SUBMARINE";
}

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
  // const [str1, str2] = inputString.trim().split("\n");

  const sound = inputString.trim();
  console.log(isSubmarine(sound));
}
