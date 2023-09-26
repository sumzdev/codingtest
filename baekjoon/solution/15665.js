// https://www.acmicpc.net/problem/15665
// N과 M (11)
// 실버 2

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

  let prevValue = -1;
  for (let idx = 0; idx < arr.length; idx++) {
    if (prevValue == arr[idx]) continue;

    stack.push(arr[idx]);
    state[idx] = 1;

    backtracking([...arr], deps + 1);

    state[idx] = 0;
    stack.pop();

    prevValue = arr[idx];
  }
}

backtracking(arr, 0);
console.log(res.trim());

/**
4 3
1 3 3 4
 */
// 1 1 1
// 1 1 3
// 1 1 4
// 1 3 1
// 1 3 3
// 1 3 4
// 1 4 1
// 1 4 3
// 1 4 4
// 3 1 1
// 3 1 3
// 3 1 4
// 3 3 1
// 3 3 3
// 3 3 4
// 3 4 1
// 3 4 3
// 3 4 4
// 4 1 1
// 4 1 3
// 4 1 4
// 4 3 1
// 4 3 3
// 4 3 4
// 4 4 1
// 4 4 3
// 4 4 4
