// https://www.acmicpc.net/problem/11722
// 가장 긴 감소하는 부분 수열

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;
nums = nums.split(" ").map(Number);

let max = new Array(nums.length).fill(1);

for (let i = 1; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    if (nums[j] > nums[i]) {
      max[i] = Math.max(max[i], max[j] + 1);
    }
  }
  // console.log("#", max.join(" "));
}

console.log(Math.max(...max));

// 참고 [T8_DP1_B] P11053 - 가장 긴 증가하는 부분수열
