// https://www.acmicpc.net/problem/15988
// 1, 2, 3 더하기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [_, ...nums] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let max = Math.max(...nums);
let arr = [0, 1, 2, 4];
for (let n = 4; n <= max; n++) {
  let tmp = arr[n - 3] + arr[n - 2] + arr[n - 1];
  arr.push(tmp % 1000000009);
  // console.log(n, tmp);
}

let res = [];
for (let num of nums) {
  res.push(arr[num]);
}

console.log(res.join("\n"));

// https://www.acmicpc.net/problem/9095
// 1, 2, 3 더하기랑 같은 문제
// % 1,000,000,009
