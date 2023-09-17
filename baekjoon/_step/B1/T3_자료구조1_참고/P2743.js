// https://www.acmicpc.net/problem/2743
// 단어 길이 재기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let line = fs.readFileSync(filePath).toString().trim();
console.log(line.length);
