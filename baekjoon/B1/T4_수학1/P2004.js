// https://www.acmicpc.net/problem/2004
// 조합 0의 개수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [a, b] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split(/\s/g)
  .map(Number);

let cnt5 = getCnt(5, a) - getCnt(5, b) - getCnt(5, a - b);
let cnt2 = getCnt(2, a) - getCnt(2, b) - getCnt(2, a - b);
console.log(cnt5 < cnt2 ? cnt5 : cnt2);

function getCnt(n, num) {
  let cnt = 0;
  for (let five = n; five <= num; five *= n) {
    cnt += Math.floor(num / five);
  }
  return cnt;
}
