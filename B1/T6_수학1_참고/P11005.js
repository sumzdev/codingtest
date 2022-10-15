// https://www.acmicpc.net/problem/11005
// 진법 변환2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [num, radix] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s/g)
  .map(Number);

console.log(num.toString(radix).toUpperCase());
