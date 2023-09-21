// https://www.acmicpc.net/problem/1874
// 스택 수열

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// string array
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");
let [, ...nums] = lineInput;

let result = [];
let snum = 1;
let stack = [];
let num;

while (nums.length > 0) {
  num = nums.shift();

  if (stack.at(-1) == num) {
    stack.pop();
    result.push("-");
    continue;
  }
  while (stack.length == 0 || stack.at(-1) < num) {
    stack.push(snum++);
    result.push("+");
  }
  result.push("-");
  stack.pop();
}

if (stack.at(-1) < num) {
  console.log("NO");
} else {
  console.log(result.join("\n"));
}
