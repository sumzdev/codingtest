// https://www.acmicpc.net/problem/2166
// 골드 5
// 다각형의 면적
// 230920

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 100.0
      "./input2.txt", // 60.0
      // "./input3.txt"
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");

  const [N, ...inputArr] = input;

  run({
    N: +N,
    pointList: inputArr.map((v) => v.split(" ").map(Number)),
  });
}

function run({ N, pointList }) {
  // console.log(N, pointList);

  let sum1 = 0;
  let sum2 = 0;

  for (let i = 0; i < N; i++) {
    sum1 += pointList[i][0] * pointList[i + 1 === N ? 0 : i + 1][1];
    sum2 += pointList[i][1] * pointList[i + 1 === N ? 0 : i + 1][0];
  }
  // console.log(sum1, sum2);

  const res = (sum1 - sum2) / 2;
  console.log(Math.abs(res).toFixed(2).slice(0, -1));
}
