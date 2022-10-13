// https://www.acmicpc.net/problem/6588
// 골드바흐의 추측

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let nums = fs.readFileSync(filePath).toString().trim().split(/\s/g).map(Number);
nums.pop();

let no = "Goldbach's conjecture is wrong.";
let result = [];

nums.forEach((num) => {
  let [a, b] = check(num);
  if (!a) result.push(no);
  else result.push(`${num} = ${a} + ${b}`);
});

console.log(result.join("\n"));

function isPrime(num) {
  for (let i = 2; i * i <= num; i++) {
    if (num % i == 0) return false;
  }
  return true;
}

function check(n) {
  for (let prime = 3; prime <= n - 3; prime += 2) {
    if (!isPrime(prime)) continue;
    if (isPrime(n - prime)) {
      return [prime, n - prime];
    }
  }
  return [false];
}
