// https://www.acmicpc.net/problem/10430
// 나머지

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let nums = fs.readFileSync(filePath).toString().trim().split(/\s/g);
let [A, B, C] = nums.map(Number);

let res1 = (A + B) % C;

let res2 = (A * B) % C;
console.log(res1);
console.log(res1);
console.log(res2);
console.log(res2);
