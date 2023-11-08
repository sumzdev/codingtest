// https://www.acmicpc.net/problem/9465
// 스티커

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [T, ...lines] = fs.readFileSync(filePath).toString().trim().split("\n");
T = +T;

let lineIdx = 0;
while (T--) {
  let N = lines[lineIdx++];
  let A = [0].concat(lines[lineIdx++].split(" ").map(Number));
  let B = [0].concat(lines[lineIdx++].split(" ").map(Number));

  for (let i = 2; i <= N; i++) {
    A[i] = Math.max(B[i - 2], B[i - 1]) + A[i];
    B[i] = Math.max(A[i - 2], A[i - 1]) + B[i];
  }

  console.log(Math.max(A[N], B[N]));
}

//     X   0   1   2   3   4
//[A]  X  50  10 100  20  40
//[B]  X  30  50  70  10  60

//      0   1   2   3   4   5
// [A]  0  50  40 200 140 250
// [B]  0  30 100 120 210 260

// A[2] = max(B[0], B[1]) + A[2] = m(0,30)+10 = 40
// B[2] = max(A[0], A[1]) + B[2] = m(50,40)+50 = 100

// A[3] = max(B[1], B[2]) + A[3] = m(30,100)+100 = 200
// B[3] = max(A[1], A[2]) + B[3] = m(50,40)+70 = 120

// A[i] = max(B[i-2], B[i-1]) + A[i]
// B[i] = max(A[i-2], A[i-1]) + B[i]
