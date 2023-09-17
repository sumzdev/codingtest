// https://www.acmicpc.net/problem/15651
// N과 M (3)
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, M] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);

let res = "";
let stack = [];
function backtracking(num, deps) {
  if (stack.length === M) {
    res += stack.join(" ") + "\n";
    return;
  }

  for (let i = num; i <= N; i++) {
    stack.push(i);
    backtracking(num, deps + 1);
    stack.pop();
  }
}

backtracking(1, 1);
console.log(res.trim());

// 시간 초과
// let numArr = new Array(N).fill(0).map((_, i) => i + 1);
// console.log(numArr, M);

// let res = permutation(numArr, M);
// res.forEach((v) => console.log(...v));

// function permutation(array, num) {
//   const result = [];
//   if (num == 1) {
//     return array.map((v) => [v]);
//   }

//   array.forEach((val, idx, arr) => {
//     const comb = permutation([...arr], num - 1);
//     result.push(...comb.map((elem) => [val, ...elem]));
//   });
//   return result;
// }
