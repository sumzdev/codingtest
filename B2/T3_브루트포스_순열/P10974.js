// https://www.acmicpc.net/problem/10974
// 모든 순열
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let N = +fs.readFileSync(filePath).toString();

let res = "";
let stack = [];
let state = new Array(N).fill(0);

function backtracking(num, deps) {
  if (stack.length === N) {
    res += stack.join(" ") + "\n";
    return;
  }

  for (let idx = num; idx <= N; idx++) {
    if (!state[idx]) {
      stack.push(idx);
      state[idx] = 1;
      backtracking(num, deps + 1);
      state[idx] = 0;
      stack.pop();
    }
  }
}

backtracking(1, 1);
console.log(res.trim());
