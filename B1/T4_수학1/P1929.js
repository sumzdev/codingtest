// https://www.acmicpc.net/problem/1929
// 소수 구하기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [min, max] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s/g)
  .map((v) => +v);

let prime = new Array(max + 1).fill(true);
prime[0] = false;
prime[1] = false;

for (let num = 2; num ** 2 <= max; num++) {
  let check = num;
  while (check <= max) {
    if (prime[check] && check !== num) {
      prime[check] = false;
    }
    check += num;
  }
}

prime = prime.map((v, idx) => (v == true && idx >= min ? idx : false));
console.log(prime.filter((v) => v).join("\n"));
