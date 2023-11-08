// https://www.acmicpc.net/problem/16194
// 카드 구매하기 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [n, cardpack] = fs.readFileSync(filePath).toString().trim().split("\n");

n = Number(n);
cardpack = cardpack.split(" ").map(Number);

let nthMin = [0].concat(...cardpack);

for (let cardCnt = 1; cardCnt <= n; cardCnt++) {
  for (let i = 1; i <= cardCnt; i++) {
    nthMin[cardCnt] = Math.min(
      nthMin[cardCnt],
      nthMin[cardCnt - i] + cardpack[i - 1]
    );
  }
}

console.log(nthMin[n]);
