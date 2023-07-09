// https://www.acmicpc.net/problem/15654
// N과 M (5)
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");
let [_, M] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);
arr.sort((a, b) => a - b);

let res = "";
let stack = [];
let state = new Array(arr.length).fill(0);

function backtracking(arr, deps) {
  if (stack.length === M) {
    res += stack.join(" ") + "\n";
    return;
  }

  for (let idx = 0; idx < arr.length; idx++) {
    if (!state[idx]) {
      stack.push(arr[idx]);
      state[idx] = true;
      backtracking([...arr], deps + 1);
      state[idx] = false;
      stack.pop();
    }
  }
}

backtracking(arr, 0);
console.log(res.trim());

/**
3 3
1 2 3
 */
// 1 2 3
// 1 3 2
// 2 1 3
// 2 3 1
// 3 1 2
// 3 2 1
