// https://www.acmicpc.net/problem/1107
// 리모컨
// 골드 5

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";

// string array
let input = fs.readFileSync(filePath).toString().trim().split("\n");

CH = +input[0];
let cur = 100;
if (cur === CH) {
  console.log(0);
  return;
}

breakList = input.length == 3 ? input[2].split(" ").map(Number) : [];
btnList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].filter((v) => !breakList.includes(v));
// console.log(CH, breakList, btnList);

let min = 500000;
for (let num = 0; num <= 1000000; num++) {
  let numStr = num.toString();

  if (
    numStr
      .split("")
      .map(Number)
      .every((v) => btnList.includes(v))
  ) {
    let tmp = numStr.length + Math.abs(num - CH);
    // if (tmp > min) break;
    // min = tmp;
    min = tmp < min ? tmp : min;
  }
}
console.log(Math.min(min, Math.abs(CH - cur)));

/**
80888
1
8
-----
894
 */
