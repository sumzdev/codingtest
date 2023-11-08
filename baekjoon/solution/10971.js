// https://www.acmicpc.net/problem/10971
// 외판원 순회 2 - Traveling Salesman problem (TSP)
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");
let N = +input.shift();
// console.log(N);

let value = input.map((v) => v.trim().split(" ").map(Number));
// console.log(value);

let min = 9999999999;
let stack = [];
let state = new Array(N).fill(0);
function backgracking(_, deps) {
  if (stack.length >= 2 && value[stack.at(-2)][stack.at(-1)] === 0) {
    return;
  }

  if (stack.length === N) {
    if (value[stack.at(-1)][stack[0]] === 0) return;
    let res = calc(stack);
    min = res < min ? res : min;
    return;
  }
  for (let i = 0; i < N; i++) {
    if (!state[i]) {
      stack.push(i);
      state[i] = 1;
      backgracking(null, deps + 1);
      state[i] = 0;
      stack.pop();
    }
  }
}
backgracking(null, 0);
console.log(min);

function calc(order) {
  let sum = 0;
  for (let i = 1; i < order.length; i++) {
    sum += value[order[i - 1]][order[i]];
  }
  sum += value[order.at(-1)][order[0]];
  return sum;
}

// T2 - 15654 - N과 M (5)
// T3 - 10819 - 차이를 최대로
