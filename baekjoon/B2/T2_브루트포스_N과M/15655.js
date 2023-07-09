// https://www.acmicpc.net/problem/15655
// N과 M (6)
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

  for (let idx = curIdx; idx < arr.length; idx++) {
    stack.push(arr[idx]);
    backtracking([...arr], idx + 1, deps + 1);
    stack.pop();
  }
}

backtracking(arr, 0, 0);
console.log(res.trim());

/**
3 2
1 2 3
 */
// 1 2
// 1 3
// 2 3

/**
3 3
1 2 3
 */
// 1 2 3
