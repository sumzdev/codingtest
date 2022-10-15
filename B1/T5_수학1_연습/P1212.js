// https://www.acmicpc.net/problem/1212
// 8진수 2진수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim();
let n = input.length;
let arr = [...input].map(Number);

let res = arr[0].toString(2);
for (let idx = 1; idx < n; idx++) {
  res += arr[idx].toString(2).padStart(3, "0");
}
console.log(res);
