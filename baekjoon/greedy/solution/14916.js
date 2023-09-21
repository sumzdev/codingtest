// https://www.acmicpc.net/problem/14916
// 실버 5
// 거스름돈

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
  const input = +inputString.trim();
  // const input = inputString.trim().split("\n");
  run(input);
}

function run(input) {
  // console.log(input);
  if (input % 5 === 0) {
    console.log(parseInt(input / 5));
    return;
  }

  let min = 999999;
  let [cnt5, cnt2] = [Math.floor(input / 5), 0];

  while (cnt5 >= 0) {
    if ((input - cnt5 * 5) % 2 == 0) {
      cnt2 = (input - cnt5 * 5) >> 1;
      const cnt = cnt5 + cnt2;
      if (min > cnt) min = cnt;
    }
    cnt5 -= 1;
  }
  if (min === 999999) console.log(-1);
  else console.log(min);
}
