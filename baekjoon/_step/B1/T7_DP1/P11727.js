// https://www.acmicpc.net/problem/11727
// 2xn 타일링 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = +fs.readFileSync(filePath).toString().trim();

let arr = [0, 1, 3];
for (let n = 3; n <= num; n++) {
  let tmp = 2 * arr[n - 2] + arr[n - 1];
  arr.push(tmp % 10007);
  // console.log(n, tmp);
}
console.log(arr[num]);
