// https://www.acmicpc.net/problem/6064
// 카잉 달력
// 실버 1

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// string array
let [_, ...inputs] = fs.readFileSync(filePath).toString().trim().split("\n");

for (let input of inputs) {
  let [M, N, X, Y] = input.split(" ").map(Number);
  let lcm = getLCM(M, N);
  let res = -1;
  for (let i = X; i <= lcm; i += M) {
    let y = i % N;
    if ((y == 0 ? N : y) !== Y) continue;
    res = i;
    break;
  }
  console.log(res);
}

function getGCD(a, b) {
  if (b == 0) return a;
  return getGCD(b, a % b);
}

function getLCM(a, b) {
  if (a == 1) return b;
  else if (b == 1) return a;
  return (a * b) / getGCD(a, b);
}
