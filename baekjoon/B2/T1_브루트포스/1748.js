// https://www.acmicpc.net/problem/1748
// 수 이어 쓰기 1
// 실버 4

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let num = +fs.readFileSync(filePath).toString().trim().split("\n");

let sum = 0;
let idx = 1;
let ac = idx * 10;
while (num >= ac) {
  sum += (ac - Math.pow(10, idx - 1)) * idx;
  // console.log(ac - Math.pow(10, idx - 1), sum, idx);
  ac = Math.pow(10, ++idx);
}
sum += (num - Math.pow(10, idx - 1) + 1) * idx;
console.log(sum);
