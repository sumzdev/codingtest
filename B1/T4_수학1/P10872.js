// https://www.acmicpc.net/problem/10872
// 팩토리얼

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = +fs.readFileSync(filePath).toString().trim();

if (num == 0) {
  console.log(1);
  return;
}

let n = new Array(num).fill(1);
console.log(n.reduce((fac, _, i) => fac * (i + 1), 1));
