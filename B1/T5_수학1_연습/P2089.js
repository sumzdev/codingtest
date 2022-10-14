// https://www.acmicpc.net/problem/2089
// -2진수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = parseInt(fs.readFileSync(filePath));
if (num == 0) {
  console.log(0);
  return;
}

let res = [];
while (num != 0) {
  prev = num;
  num = Math.ceil(num / -2);
  res.push(prev - -2 * num);
}

console.log(res.reverse().join(""));
