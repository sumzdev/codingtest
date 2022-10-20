// https://www.acmicpc.net/problem/10844
// 쉬운 계단 수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = fs.readFileSync(filePath).toString().trim();

let prev = [0, 1, 1, 1, 1, 1, 1, 1, 1, 1];
let cur = [...prev];
let MOD = 1000000000;

for (let n = 2; n <= num; n++) {
  cur[0] = prev[1] % MOD;
  cur[9] = prev[8] % MOD;
  for (let t = 1; t < 9; t++) {
    cur[t] = (prev[t - 1] + prev[t + 1]) % MOD;
  }
  prev = [...cur];
}

let sum = cur.reduce((sum, v) => sum + v, 0);
console.log(sum % MOD);

/*
n [끝자리 0개수 ... 끝자리 9개수] 총합
-----------------------------------
2 [ 1 1 2 2 2 2 2 2 2 1 ] 17
3 [ 1 3 3 4 4 4 4 4 3 2 ] 32
4 [ 3 4 7 7 8 8 8 7 6 3 ] 61
5 [ 4 10 11 15 15 16 15 14 10 6 ] 116
6 [ 10 15 25 26 31 30 30 25 20 10 ] 222
7 [ 15 35 41 56 56 61 55 50 35 20 ] 424
8 [ 35 56 91 97 117 111 111 90 70 35 ] 813
9 [ 56 126 153 208 208 228 201 181 125 70 ] 1556
10 [ 126 209 334 361 436 409 409 326 251 125 ] 2986

규칙 :
[0] = prev[1], [9] = prev[8]
[i=1..8] : prev[i-1] + prev[i+1]
 */
