// https://www.acmicpc.net/problem/10799
// 쇠막대기
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let line = fs.readFileSync(filePath).toString().trim();

let idx = 0;
let depth = 0;
let cnt = 0;
while (idx < line.length) {
  if (line[idx] == "(") {
    if (line[idx + 1] == ")") {
      cnt += depth;
      idx++;
    } else {
      depth++;
    }
  } else {
    cnt++;
    depth--;
  }
  idx++;
}
console.log(cnt);
