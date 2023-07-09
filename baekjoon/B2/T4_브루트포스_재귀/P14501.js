// https://www.acmicpc.net/problem/14501
// 퇴사
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input.shift();
let T = [];
let P = [];
for (let i = 0; i < N; i++) {
  [T[i], P[i]] = input[i].split(" ").map(Number);
}
// console.log(N);
// console.log(...T);
// console.log(...P);

let dp = new Array(N + 1).fill(0);

for (i = N - 1; i >= 0; i--) {
  if (T[i] <= N - i) {
    if (T[i] === 1) {
      dp[i] = dp[i + 1] + P[i];
      continue;
    } else if (P[i] > dp[i + 1] - dp[i + T[i]]) {
      dp[i] = dp[i + T[i]] + P[i];
      continue;
    }
  }

  dp[i] = dp[i + 1];
}

console.log(dp[0]);

// DP
// N=6
//     0 1 2 3 4 5
// [T] 3 3 1 2 2 2
// [P] 2 7 2 4 3 6

// 뒤에서 부터 계산
