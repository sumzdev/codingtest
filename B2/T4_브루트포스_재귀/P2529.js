// https://www.acmicpc.net/problem/2529
// 부등호
// 실버 1

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input[0];
let arr = new Array(10).fill(1).map((_, i) => i);
let ineqArr = input[1].split(" ");

let min = Number.MAX_SAFE_INTEGER;
let max = -1;
let stack = [];
let state = new Array(10).fill(0);

function backtracking(arr) {
  if (!check(stack)) {
    return;
  }

  if (stack.length === N + 1) {
    let val = parseInt(stack.join(""));
    min = min > val ? val : min;
    max = max < val ? val : max;
    return;
  }

  for (let idx = 0; idx < arr.length; idx++) {
    if (!state[idx]) {
      stack.push(arr[idx]);
      state[idx] = 1;
      backtracking([...arr]);
      state[idx] = 0;
      stack.pop();
    }
  }
}

backtracking(arr);
console.log(String(max).padStart(N + 1, "0"));
console.log(String(min).padStart(N + 1, "0"));

function check(arr) {
  if (arr.length < 2) {
    return true;
  }
  if (ineqArr[arr.length - 2] === "<") {
    return arr.at(-2) < arr.at(-1);
  } else {
    return arr.at(-2) > arr.at(-1);
  }
}
