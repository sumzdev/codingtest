// https://www.acmicpc.net/problem/11576
// 진법 변환

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");

let [radixA, radixB] = lineInput[0].split(" ").map(Number);
let nums = lineInput[2].split(" ");
nums = nums.map((num) => numToAlpha(num));

let numStr = nums.join("");
// console.log(numStr);

let numA = parseInt(numStr, radixA);
// console.log(numA);

let numB = numA.toString(radixB);
// console.log(radixB);

numB = numB.split("").map((v) => parseInt(v, radixB));
console.log(numB.join(" "));

function numToAlpha(num) {
  return +num >= 10
    ? String.fromCodePoint("A".codePointAt(0) + (+num - 10))
    : num;
}
