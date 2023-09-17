// https://www.acmicpc.net/problem/11052
// 카드 구매하기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [n, cardpack] = fs.readFileSync(filePath).toString().trim().split("\n");

n = Number(n);
cardpack = cardpack.split(" ").map(Number);
cardpack.unshift(0);

let nthMax = new Array(n + 1).fill(0);
for (let cardCnt = 1; cardCnt <= n; cardCnt++) {
  for (let i = 1; i <= cardCnt; i++) {
    nthMax[cardCnt] = Math.max(
      nthMax[cardCnt],
      nthMax[cardCnt - i] + cardpack[i]
    );
  }
}

console.log(nthMax[n]);
