// https://www.acmicpc.net/problem/1182
// 부분수열의 합
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, S] = input[0].split(" ").map(Number);
let arr = input[1].split(" ").map(Number);

let stack = [];
let cnt = 0;

function backtracking(arr, curIdx) {
  console.log(stack, check(stack));
  if (check(stack)) {
    cnt++;
  }

  for (let idx = curIdx; idx < arr.length; idx++) {
    stack.push(arr[idx]);
    backtracking([...arr], idx + 1);
    stack.pop();
  }
}

backtracking(arr, 0);
console.log(cnt);

function check(arr) {
  return arr.reduce((sum, v) => sum + v, null) == S;
}
