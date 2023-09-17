// https://www.acmicpc.net/problem/1934
// 최소공배수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [_, ...nums] = fs.readFileSync(filePath).toString().trim().split("\n");

function getGCD(a, b) {
  if (b == 0) return a;
  return getGCD(b, a % b);
}

function getLCM(a, b) {
  if (a == 1) return b;
  else if (b == 1) return a;
  gcd = getGCD(a, b);
  return (a * b) / gcd;
}

let res = [];
nums.forEach((v) => {
  let [a, b] = v.split(" ").map(Number);
  res.push(getLCM(a, b));
});

console.log(res.join("\n"));
