// https://www.acmicpc.net/problem/2193
// 이친수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = fs.readFileSync(filePath).toString().trim();

let arr = [0n, 1n];

for (let n = 2; n <= num; n++) {
  arr.push(arr[n - 2] + arr[n - 1]);
}
console.log(arr[num] + "");

// 설명 : 10844 참고
