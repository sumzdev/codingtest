// https://www.acmicpc.net/problem/1463
// 1로 만들기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = +fs.readFileSync(filePath).toString().trim();

let arr = [0, 0, 1];
for (let n = 3; n <= num; n++) {
  let tmp = arr[n - 1] + 1;
  if (n % 2 == 0) tmp = Math.min(tmp, arr[n / 2] + 1);
  if (n % 3 == 0) tmp = Math.min(tmp, arr[n / 3] + 1);
  arr.push(tmp);
}
console.log(arr[num]);
