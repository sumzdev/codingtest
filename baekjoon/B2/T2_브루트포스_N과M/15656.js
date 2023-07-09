// https://www.acmicpc.net/problem/15656
// N과 M (7)
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");
let [_, M] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

let res = "";
let stack = [];

function backtracking(arr, curIdx, deps) {
  if (stack.length === M) {
    res += stack.join(" ") + "\n";
    return;
  }

  for (let idx = 0; idx < arr.length; idx++) {
    stack.push(arr[idx]);
    backtracking([...arr], idx + 1, deps + 1);
    stack.pop();
  }
}

backtracking(arr, 0, 0);
console.log(res.trim());
