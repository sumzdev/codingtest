// https://www.acmicpc.net/problem/11653
// 소인수분해

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let num = +fs.readFileSync(filePath).toString().trim();

function getPrimeFacotization(num) {
  const primeFactor = [];
  let factor = 2;
  let rest = num;
  while (rest > 1) {
    if (rest % factor == 0) {
      primeFactor.push(factor);
      rest /= factor;
      continue;
    }
    factor++;
  }
  return primeFactor;
}

console.log(getPrimeFacotization(num).join("\n"));
