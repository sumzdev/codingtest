// https://www.acmicpc.net/problem/1676
// • 팩토리얼 0의 개수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = +fs.readFileSync(filePath).toString().trim();

// function check(num) {
//   let n = new Array(num).fill(1);
//   let fac = n.reduce((fac, _, i) => fac * BigInt(i + 1), 1n) + "";
//   console.log(">>>>", fac);

//   let cnt = 0;
//   for (let num of [...fac].reverse()) {
//     if (num == "0") cnt++;
//   }
//   console.log(">>>>", cnt);
// }
// check(num);

let cnt = 0;
for (let five = 5; five <= num; five *= 5) {
  cnt += Math.floor(num / five);
}
console.log(cnt);
