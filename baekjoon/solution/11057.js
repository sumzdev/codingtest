// https://www.acmicpc.net/problem/11057
// 오르막 수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

const N = +fs.readFileSync(filePath).toString().trim();
const MOD = 10007;

let cnt = new Array(10).fill(1);
for (let n = 2; n <= N; n++) {
  for (let i = 1; i <= 9; i++) {
    cnt[i] = (cnt[i - 1] + cnt[i]) % MOD;
  }
}
console.log(cnt.reduce((sum, v) => v + sum, 0) % MOD);

// N
// 1 = 0-9 -> 10
// 2 = 00-09, 11-19, 22-29, ..., 88-89, 99 = 10+9+...2+1 = 55
// ...

// 시작숫자 0   1   2   3   4   5   6   7   8   9 | SUM
// N=1 |  1   1   1   1   1   1   1   1   1   1 | 10
// N=2 | 10   9   8   7   6   5   4   3   2   1 | 55
// N=3 | 55  45  36  28  21  15  10   6   3   1 | 220
// N=4 |220 165 120  84  56  35  20  10   4   1 |

// N일때 i로 시작하는 오르막 수 개수
// = arr[N-1][i] + ... + arr[N-1][9]
// = arr[N-1][i] + arr[N][i+1]

// 배열에 9로 시작하는 숫자의 오르막수 개수부터 저장하면
//      0, 1, 2, 3, 4, 5, 6, 7, 8, 9
// N=1 [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
// N=2 [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// N=3 [1, 3, 6, 10, 15, 21, 28, 36, 45, 55]
// ...

// N일 때 i로 시작하는 오르막 개수
// = arr[N-2][i] + arr[N-1][i-1]
