// https://www.acmicpc.net/problem/1373
// 2진수 8진수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim();
let n = input.length;

let arr = [...input].reverse().map(Number);

let resNum = new Array(Math.ceil(n / 3));

for (let idx = 0; idx < n; idx += 3) {
  let n1 = arr[idx];
  let n2 = idx + 1 < n ? arr[idx + 1] << 1 : 0;
  let n4 = idx + 2 < n ? arr[idx + 2] << 2 : 0;
  resNum.push(n1 + n2 + n4);
}

console.log(resNum.reverse().join(""));
