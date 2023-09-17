// https://www.acmicpc.net/problem/17404
// RGB거리

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, ...inputs] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;

let prices = [];
inputs.forEach((str) => prices.push(str.split(" ").map(Number)));

let dp = prices.map((v) => [...v]);
let res = [];

for (let first = 0; first < 3; first++) {
  let i = 1;
  for (let idx = 0; idx < 3; idx++) {
    dp[1][idx] = prices[i][idx] + prices[i - 1][first];
    if (idx == first) dp[1][idx] = 1000;
  }

  for (i = 2; i < N; i++) {
    dp[i][0] = prices[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    dp[i][1] = prices[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    dp[i][2] = prices[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }

  // console.log(dp);
  let result = [...dp[i - 1]];
  result.splice(first, 1);
  res = res.concat(result);
}

console.log(Math.min(...res));

// 참고 T9 1149 RGB거리
// 1149  :N번 집의 색은 N-1번 집의 색과 같지 않아야 한다.
// 17404 :N번 집의 색은 N-1번, 1번 집의 색과 같지 않아야 한다.

// 각 r, g, b가 첫번째로 올 때 구하기
// 첫 번째, 두 번째 같은 값 오지 못하므로, 같을 경우 1000 더해줘서 선택되지 않도록 함

// 그중 최소값 구하기
// res[0] : r이 첫번째, [r,g,b]가 마지막으로 올 때 최솟값 목록 - [rr, rg, rb] ->[rg, rb]
// res[1] : g가 첫번째, [r,g,b]가 마지막으로 올 때 최솟값 목록 - [gr, gg, gb] ->[gr, gb]
// res[2] : b가 첫번째, [r,g,b]가 마지막으로 올 때 최솟값 목록 - [br, bg, bb] ->[br, bg]
// -> rr, gg, bb 제외한 최소값 구하기
