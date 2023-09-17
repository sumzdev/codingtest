// https://www.acmicpc.net/problem/1309
// 동물원

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const N = +fs.readFileSync(filePath).toString().trim();
const MOD = 9901;

const cntLions = [1, 3];
for (let n = 2; n <= N; n++) {
  let cnt = cntLions[n - 2] + cntLions[n - 1] * 2;
  cntLions.push(cnt % MOD);
}
console.log(cntLions[N]);

//    0  1  2  3  4 .. (사자수)
// N ----------------------
// 0  1                 1
// 1  1  2              3
// 2  1  4  2           7 = 1 + 3+3
// 3  1  6  8  2       17 = 3 + 7+7
// 4  1  8 18 12  2    41 = 7 + 17+17
