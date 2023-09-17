// https://www.acmicpc.net/problem/17299
// 오등큰수
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [n, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
nums = nums.split(" ");

let cnt = {};
nums.forEach((v) => (cnt[v] = cnt[v] ? cnt[v] + 1 : 1));

let stack = [];
let res = new Array(+n).fill(-1);

nums.forEach((v, idx) => {
  while (stack.length > 0 && stack.at(-1).count < cnt[v]) {
    res[stack.pop().index] = v;
  }
  stack.push({ count: cnt[v], index: idx, value: v });
});
console.log(res.join(" "));
