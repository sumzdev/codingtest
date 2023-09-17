// https://www.acmicpc.net/problem/17103
// 골드바흐 파티션

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [_, ...nums] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let maxNum = nums.reduce((max, n) => (n > max ? n : max), 0);
const primes = getPrimes(maxNum);
// console.log(primes);

const result = [];
nums.forEach((num) => result.push(getPartitions(num)));
console.log(result.join("\n"));

function getPartitions(num) {
  let cnt = 0;
  let i = num <= 4 ? 0 : 3;
  for (; i <= Math.floor(num / 2); i += 2) {
    if (primes[i] == true && primes[num - i] == true) cnt++;
  }
  return cnt;
}

function getPrimes(max) {
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
  return prime;
}
