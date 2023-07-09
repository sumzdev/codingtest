// https://www.acmicpc.net/problem/1978
// 소수 찾기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [_, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
nums = nums.split(" ").map(Number);

function isPrime(num) {
  if (num == 1) return false;
  for (let i = 2; i * i <= num; i++) {
    if (num % i == 0) return false;
  }
  return true;
}

let cnt = nums.reduce((acc, v) => (isPrime(v) ? acc + 1 : acc), 0);
console.log(cnt);
