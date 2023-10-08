// https://www.acmicpc.net/problem/15661
// 링크와 스타트
// 실버 1
// 22년 12월

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift();
let plist = new Array(N).fill(1).map((_, i) => i);

let stats = [];
for (let i = 0; i < N; i++) {
  stats[i] = input[i].split(" ").map(Number);
}
// console.log(stats);

let min = 9999999;
let stack = [];
function backtracking(num) {
  if (stack.length >= 1) {
    let val = calcStats(stack);
    min = min > val ? val : min;

    if (stack.length == N - 1) {
      return;
    }
  }
  for (let idx = num; idx < N; idx++) {
    stack.push(idx);
    backtracking(idx + 1);
    stack.pop();
  }
}

backtracking(0, 0);
console.log(min);

function calcStats(t1_p) {
  let t2_p = plist.filter((v) => !t1_p.includes(v));

  let t1 = 0;
  let t2 = 0;

  if (t1_p.length > 1) {
    for (let p0 of t1_p) {
      for (let p1 of t1_p) {
        if (p0 === p1) continue;
        t1 += stats[p0][p1];
      }
    }
  }

  if (t2_p.length > 1) {
    for (let p0 of t2_p) {
      for (let p1 of t2_p) {
        if (p0 === p1) continue;
        t2 += stats[p0][p1];
      }
    }
  }
  // console.log(t1_p, t2_p, t1, t2, Math.abs(t1 - t2));
  return Math.abs(t1 - t2);
}
