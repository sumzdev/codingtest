// https://www.acmicpc.net/problem/17087
// 숨바꼭질 6

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let lines = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, S] = lines[0].split(" ").map(Number);
let arr = lines[1].split(" ").map(Number);
arr = arr.map((v) => Math.abs(v - S));

let gcd = arr[0];
for (let num of arr) {
  gcd = getGCD(gcd, num);
}
console.log(gcd);

function getGCD(a, b) {
  let [small, big] = a < b ? [a, b] : [b, a];
  while (small != 0) {
    [big, small] = [small, big % small];
  }
  return big;
}
