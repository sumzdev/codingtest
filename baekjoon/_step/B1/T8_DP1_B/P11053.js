// https://www.acmicpc.net/problem/11053
// 가장 긴 증가하는 부분 수열

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [n, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
nums = nums.split(" ").map(Number);

let max = new Array(nums.length).fill(1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    if (nums[j] < nums[i]) {
      max[i] = Math.max(max[i], max[j] + 1);
    }
  }
  // console.log(max.join(" "));
}

console.log(Math.max(...max));

/*
8
10 20 10 30 20 50 40 41
1 2 1 1 1 1 1 1 (2)
1 2 1 1 1 1 1 1 (3)
1 2 1 3 1 1 1 1 (4)
1 2 1 3 2 1 1 1 (5)
1 2 1 3 2 4 1 1 (6)
1 2 1 3 2 4 4 1 (7)
1 2 1 3 2 4 4 5 (8)
*/
