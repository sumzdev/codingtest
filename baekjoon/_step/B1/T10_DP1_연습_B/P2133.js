// https://www.acmicpc.net/problem/2133
// 타일 채우기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let N = +fs.readFileSync(filePath).toString().trim().split("\n");
if (N % 2 == 1) {
  console.log(0);
  return;
}

N = (N >> 1) - 1;

let dp = [3, 11];
let dp2 = [0, 2];

for (let i = 2; i <= N; i++) {
  dp2[i] = dp2[i - 1] + dp[i - 2] * 2;
  dp[i] = dp2[i] + dp[0] * dp[i - 1];
}
// console.log(...dp);
// console.log(...dp2);
console.log(dp[N]);

// N[2] : 3

// N[4] : 11
// = N2*N2 + 2
// = 11

// N[6] : 41
// = N2*N4 + N2*2 + 2
// = 3*11 + 3*2 + 2
// = 33 + 6 + 2
// = 41

// N[8]
// = N2*N6 + N4*2 + N2*2 + 2
// = 3*41 + 11*2 + 6 + 2
// = 123 + 22 + 6 + 2
// = 153

// N[n]
// = N[n-2] * N[2]  +  N[n-4]*2  +  N[n-6]*2  +  ... + N[0]*2

// ------------------------------------------
// dp(i) = 2 + dp(0)*2 + ... + dp(i-2)*2 + dp(0) * dp(i-1)
// ------------------------------------------
// i=2 (N=6)
// dp(0) = 3
// dp(1) = 2 + dp(0)*dp(0)
// dp(2) = 2 + dp(0)*2 + dp(0)*dp(1)
// dp(3) = 2 + dp(0)*2 + dp(1)*2 + dp(0)*dp(2)
// dp(4) = 2 + dp(0)*2 + dp(1)*2 + dp(2)*2 + dp(0)*dp(3)
