// https://www.acmicpc.net/problem/17298
// 오큰수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";

let [n, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
nums = nums.split(" ").map(Number);

let stack = [];
let res = new Array(+n).fill(-1);

nums.forEach((v, idx) => {
  while (stack.length > 0 && stack.at(-1).value < v) {
    res[stack.pop().index] = v;
  }
  stack.push({ value: v, index: idx });
});
console.log(res.join(" "));

// 8
// 9 7 8 5 30 11 2 10
