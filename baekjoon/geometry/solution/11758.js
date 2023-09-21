// https://www.acmicpc.net/problem/11758
// 골드 5
// CCW
// 230920

// 수학문제...

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // -1
      "./input2.txt", // 0
      "./input3.txt", // 1
      "./input4.txt", // 1
      "./input5.txt", // -1
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");

  run({
    pointList: input.map((v) => v.split(" ").map(Number)),
  });
}

function run({ pointList }) {
  let sum1 = 0;
  let sum2 = 0;

  const N = 3;
  for (let i = 0; i < N; i++) {
    sum1 += pointList[i][0] * pointList[i + 1 === N ? 0 : i + 1][1];
    sum2 += pointList[i][1] * pointList[i + 1 === N ? 0 : i + 1][0];
  }

  const res = (sum1 - sum2) / 2;
  console.log(res > 0 ? 1 : res === 0 ? 0 : -1);
}
