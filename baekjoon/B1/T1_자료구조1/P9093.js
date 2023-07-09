// https://www.acmicpc.net/problem/9093
// 단어 뒤집기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// string array
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");
let [, ...lines] = lineInput;

let result = [];
for (let line of lines) {
  result.push(
    line
      .split(" ")
      .map((v) => [...v].reverse().join(""))
      .join(" ")
  );
}
console.log(result.join("\n"));
