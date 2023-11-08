// https://www.acmicpc.net/problem/1912
// 연속합

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";

let [n, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
n = +n;
nums = nums.split(" ").map(Number);

let maxSum = [...nums];

for (let i = 1; i < n; i++) {
  if (maxSum[i - 1] + nums[i] > nums[i]) {
    maxSum[i] = maxSum[i - 1] + nums[i];
  }
}

let max = Math.max(...maxSum);
console.log(max);
