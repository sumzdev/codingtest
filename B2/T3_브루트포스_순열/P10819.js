// https://www.acmicpc.net/problem/10819
// 차이를 최대로
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");
let N = +input[0];
// 3 <= N <= 8
let arr = input[1].split(" ").map(Number);
// -100 <= item <= 100

let max = 0;
let stack = [];
let state = new Array(N).fill(0);
function backtracking(arr, deps) {
  if (stack.length === N) {
    let res = calc(stack);
    max = res > max ? res : max;
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
console.log(max);

function calc(arr) {
  let sum = 0;
  for (let i = 1; i < arr.length; i++) {
    sum += Math.abs(arr[i - 1] - arr[i]);
  }
  return sum;
}

// T2 - 15654 - N과 M (5)
