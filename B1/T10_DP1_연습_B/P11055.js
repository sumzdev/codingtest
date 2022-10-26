// https://www.acmicpc.net/problem/11055
// 가장 큰 증가 부분 수열

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;
nums = nums.split(" ").map(Number);

// let max = new Array(nums.length).fill(1);
let max = [...nums];

for (let i = 1; i < N; i++) {
  for (let j = 0; j <= i; j++) {
    // process.stdout.write(arrayToStr([j, i, "num", nums[j], nums[i]]));
    if (nums[j] < nums[i]) {
      max[i] = Math.max(max[i], max[j] + nums[i]);
      // process.stdout.write(arrayToStr(["=> max", max[j], max[i]]));
    }
    // console.log("");
  }
  // console.log("#", max.join(" "));
}

console.log(Math.max(...max));

// function arrayToStr(arr) {
//   return arr.reduce((str, cur) => (str += cur.toString() + ", "), "");
// }

// 10 20 10 30 20 50 40 41 10

// 10 30 10 30 20 50 40 41 10
// 10 30 10 30 20 50 40 41 10
// 10 30 10 60 20 50 40 41 10
// 10 30 10 60 30 50 40 41 10
// 10 30 10 60 30 110 40 41 10
// 10 30 10 60 30 110 100 41 10
// 10 30 10 60 30 110 100 141 10
// 10 30 10 60 30 110 100 141 10
