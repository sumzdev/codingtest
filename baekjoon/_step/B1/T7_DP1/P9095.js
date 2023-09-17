// https://www.acmicpc.net/problem/9095
// 1, 2, 3 더하기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [_, ...nums] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let res = [];
for (let num of nums) {
  let arr = [0, 1, 2, 4];
  for (let n = 4; n <= num; n++) {
    let tmp = arr[n - 3] + arr[n - 2] + arr[n - 1];
    arr.push(tmp);
    // console.log(n, tmp);
  }
  res.push(arr[num]);
}
console.log(res.join("\n"));
