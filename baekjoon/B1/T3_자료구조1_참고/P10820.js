// https://www.acmicpc.net/problem/10820
// 문자열 분석

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let lines = fs.readFileSync(filePath).toString().split("\n");
console.log(lines);

let res = [];
lines.forEach((line) => {
  if (line.length > 0) {
    let result = [
      line.match(/[a-z]/g),
      line.match(/[A-Z]/g),
      line.match(/[0-9]/g),
      line.match(/ /g),
    ];
    result = result.map((v) => (v ? v.length : 0));
    res.push(result.join(" "));
  }
});
console.log(res.join("\n"));
