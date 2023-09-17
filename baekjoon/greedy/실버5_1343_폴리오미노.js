// https://www.acmicpc.net/problem/1343
// 실버 5
// 폴리오미노

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
  const input = inputString.trim();
  // const input = inputString.trim().split("\n");
  run(input);
}

function run(input) {
  // console.log(input.split("."));
  // console.log(input);

  const res = input.replaceAll("XXXX", "AAAA").replaceAll("XX", "BB");
  if (res.includes("X")) {
    console.log(-1);
    return;
  }
  console.log(res);
}
