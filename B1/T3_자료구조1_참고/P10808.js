// https://www.acmicpc.net/problem/10808
// 알파벳 개수

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let str = fs.readFileSync(filePath).toString().trim();

let a = "a".codePointAt(0);
let z = "z".codePointAt(0);

let cnt = new Array(z - a + 1).fill(0);
[...str].forEach((v) => cnt[v.codePointAt(0) - a]++);
console.log(cnt.join(" "));
