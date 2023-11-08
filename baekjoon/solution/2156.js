// https://www.acmicpc.net/problem/2156
// 포도주 시식

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, ...nums] = fs.readFileSync(filePath).toString().trim().split("\n");
nums = nums.map(Number);

if (nums.length < 3) {
  console.log(nums.reduce((sum, v) => sum + v, 0));
  return;
}

let dp = new Array(+N).fill(0);
dp[1] = nums[0];
dp[2] = nums[0] + nums[1];

for (let i = 3; i <= nums.length; i++) {
  dp[i] = Math.max(
    dp[i - 3] + nums[i - 2] + nums[i - 1],
    dp[i - 2] + nums[i - 1],
    dp[i - 1]
  );
  // console.log(i, nums[i], dp);
}

console.log(dp.at(-1));

//  0  1  2  3  4  5
//  6 10 13  9  8  1

//    o  [o] - nums[i-1] + nums[i]      = dp[i-3] + nums[i-1] + nums[i]
// o     [o] - nums[i-2] + nums[i]      = dp[i-2] + nums[i]
// o  o  [x] - nums[i-2] + nums[i-1]    = dp[i-1]
