// https://www.acmicpc.net/problem/2225
// 합분해

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, K] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);

let cnt = new Array(N + 1).fill(1);

for (let k = 2; k <= K; k++) {
  // console.log(">>", k);
  for (let idx = 1; idx <= N; idx++) {
    cnt[idx] = (cnt[idx] + cnt[idx - 1]) % 1000000000;
  }
  // console.log(cnt.join(" "));
}

console.log(cnt[N]);

// -------- N을 만들기 위해
// | K개의 숫자로 만드는 경우의 수
// K\N 0  1  2  3  4  5  6 ..
// 1   1  1  1  1  1  1  1 ..
// 2   1  2  3  4  5  6  7 ..
// 3   1  3  6 10 15 21 28 ..
// 4   1  4 10 20 35 56 84 ..
