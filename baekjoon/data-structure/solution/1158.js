// https://www.acmicpc.net/problem/1158
// 요세푸스 문제
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [n, k] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s/g)
  .map((v) => parseInt(v));

const res = [];
const arr = new Array(n).fill(1);
let rest = n;
let cur = -1;
let move = k;

while (rest) {
  move = k;
  while (move) {
    cur = ++cur >= n ? 0 : cur;
    if (arr[cur] == 1) {
      --move;
    }
  }
  res.push(cur + 1);
  arr[cur] = 0;
  rest--;
}
console.log(`<${res.join(", ")}>`);
