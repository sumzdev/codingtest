// https://www.acmicpc.net/problem/6603
// 로또
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N, arr, stack;
let res = "";

for (let i = 0; i < input.length - 1; i++) {
  // console.log(input[i]);
  [N, ...arr] = input[i].split(" ").map(Number);
  // console.log(N, arr);
  arr.sort((a, b) => a - b);

  stack = [];
  backtracking(arr, 0);
  res += "\n";
}
console.log(res.trim());

function backtracking(arr, curIdx) {
  if (stack.length === 6) {
    res += stack.join(" ") + "\n";
    return;
  }
  for (let idx = curIdx; idx < arr.length; idx++) {
    stack.push(arr[idx]);
    backtracking([...arr], idx + 1);
    stack.pop();
  }
}

// T2 - 15655 - N과 M (6)
