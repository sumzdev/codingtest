// https://www.acmicpc.net/problem/11656
// 접미사 배열

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let str = fs.readFileSync(filePath).toString().trim();

let su = new Array(str.length).fill(0);
su = su.map((_, i) => str.slice(i)).sort((a, b) => a.localeCompare(b));
console.log(su.join("\n"));
