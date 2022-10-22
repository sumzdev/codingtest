// https://www.acmicpc.net/problem/1149
// RGB거리

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, ...inputs] = fs.readFileSync(filePath).toString().trim().split("\n");

let prev = strToNums(inputs.shift());
let cur = [...prev];

inputs.forEach((arr) => {
  let [r, g, b] = strToNums(arr);
  cur[0] = Math.min(r + prev[1], r + prev[2]);
  cur[1] = Math.min(g + prev[0], g + prev[2]);
  cur[2] = Math.min(b + prev[0], b + prev[1]);
  // console.log(prev, r, g, b, cur);
  prev = [...cur];
});

console.log(Math.min(...cur));

function strToNums(arr) {
  return arr.split(" ").map(Number);
}

// 1R 1G 1B
// 2R 2G 2B
// --------------
// [1R 1G 1B]
// [min(2R+1G, 2R+1B), min(2G+1R, 2G+1B), min(2B+1R, 2B+1G)]

// ex)
// 2
// 10   11   12
// 1   100  100
//
// 10   11   12
// 1+11 10+100 10+100
// 12 110 110
// min = 12
