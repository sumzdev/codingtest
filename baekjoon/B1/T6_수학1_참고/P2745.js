// https://www.acmicpc.net/problem/2745
// 진법 변환

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let [numStr, radix] = fs.readFileSync(filePath).toString().trim().split(/\s/g);

console.log(parseInt(numStr, +radix));
