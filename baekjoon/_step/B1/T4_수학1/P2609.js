// https://www.acmicpc.net/problem/2609
// 최대공약수와 최소공배수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let nums = fs.readFileSync(filePath).toString().trim().split(/\s/g);
let [A, B] = nums.map(Number);

function getGCD(a, b) {
  if (b == 0) return a;
  else return getGCD(b, a % b);
}

function getLCM(a, b, gcd) {
  if (gcd == undefined) gcd = getGCD(a, b);
  return (a * b) / gcd;
}

let gcd = getGCD(A, B);
let lcd = getLCM(A, B, gcd);

console.log(gcd);
console.log(lcd);
