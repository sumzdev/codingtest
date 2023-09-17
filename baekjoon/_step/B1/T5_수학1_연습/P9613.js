// https://www.acmicpc.net/problem/9613
// GCD합

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let lines = fs.readFileSync(filePath).toString().trim().split("\n");
lines.shift();

let res = [];
for (let line of lines) {
  let [n, ...nums] = line.split(" ").map(Number);
  if (n == 1) {
    res.push(nums[0]);
    continue;
  }

  let sumGcd = 0;
  for (let i = 0; i < n - 1; i++) {
    for (let j = i + 1; j < n; j++) {
      sumGcd += getGCD(nums[i], nums[j]);
    }
  }
  res.push(sumGcd);
}
console.log(res.join("\n"));

function getGCD(a, b) {
  let [small, big] = a < b ? [a, b] : [b, a];
  while (small != 0) {
    [big, small] = [small, big % small];
  }
  return big;
}
