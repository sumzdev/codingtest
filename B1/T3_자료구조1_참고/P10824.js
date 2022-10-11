// https://www.acmicpc.net/problem/10824
// 네 수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let nums = fs.readFileSync(filePath).toString().trim().split(/\s/g);

console.log(Number(nums[0] + nums[1]) + Number(nums[2] + nums[3]));
