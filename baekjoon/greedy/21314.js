// https://www.acmicpc.net/problem/21314
// 실버 2
// 민겸 수

// MKKKMMK
// max: MK K K MMK
// min: M K K K MM K

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  // const input = inputString.trim().split("\n");
  const input = inputString.trim();
  run(input);
}

function changeMKNum(MKStr) {
  const numStr = MKStr.at(-1) === "M" ? "1" : "5";
  // console.log(MKStr, numStr.padEnd(MKStr.length, "0"));
  return numStr.padEnd(MKStr.length, "0");
}

function joinMinNum(splitedMK) {
  return splitedMK.reduce((res, v) => (!v ? res : res + changeMKNum(v)), "");
}

function run(input) {
  // console.log(input);

  const maxMK = input.split(/(K)|(M+K)|(M)/g);
  const minMK = input.split(/(M+)|(K)/g);
  console.log(maxMK, minMK);

  console.log(joinMinNum(maxMK));
  console.log(joinMinNum(minMK));
}
