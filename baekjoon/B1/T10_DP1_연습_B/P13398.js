// https://www.acmicpc.net/problem/13398
// 연속합 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let [N, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;
nums = nums.split(" ").map(Number);

let dp = [...nums]; // min 제외 안함
let dp2 = [...nums]; // min 제외

for (let i = 1; i < N; i++) {
  if (nums[i] + dp[i - 1] > nums[i]) {
    dp[i] = nums[i] + dp[i - 1];
  }

  if (dp[i - 1] > nums[i] + dp2[i - 1]) {
    // min 제외
    dp2[i] = dp[i - 1];
  } else {
    dp2[i] = nums[i] + dp2[i - 1];
  }
}
console.log(...dp);
console.log(...dp2);
console.log(Math.max(...dp, ...dp2));

//nums 10  -4   3   1   5   6 -35  12  21  -1
//dp  [10]  6   9  10  15  [21] -14  12  32  31
//dp2  10 [10] 13  14  19  25  [21]  33  54  53
//       min=-4             min=-35
