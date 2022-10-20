// https://www.acmicpc.net/problem/14002
// 가장 긴 증가하는 부분 수열 4

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [n, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
n = +n;
nums = nums.split(" ").map(Number);

let maxCnt = new Array(n).fill(1);
let prevIdx = new Array(n).fill(-1);

for (let i = 1; i < n; i++) {
  for (let j = 0; j <= i; j++) {
    if (nums[j] < nums[i]) {
      if (maxCnt[j] + 1 > maxCnt[i]) {
        maxCnt[i] = maxCnt[j] + 1;
        prevIdx[i] = j;
      }
    }
  }
}

// console.log(maxCnt.join(" "));
// console.log(prevIdx.join(" "));

let max = Math.max(...maxCnt);
let arr = [];
for (let idx = maxCnt.indexOf(max); idx != -1; idx = prevIdx[idx]) {
  arr.push(nums[idx]);
}
console.log(max);
console.log(arr.reverse().join(" "));

/*
8
10 20 10 30 20 50 40 41

1 2 1 1 1 1 1 1 // (2) maxCnt
.. (11053 참고)
1 2 1 3 2 4 4 5 // (8) macCnt

-1 0 -1 1 0 3 3 6 // prevIdx

*/
