// https://www.acmicpc.net/problem/9012
// 괄호

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// string array
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");
let [, ...lines] = lineInput;

let result = [];
loop: for (let line of lines) {
  let stack = [];

  for (let value of [...line]) {
    if (value == "(") stack.push(value);
    else if (value == ")") {
      if (stack.length == 0) {
        result.push("NO");
        continue loop;
      } else {
        stack.pop();
      }
    }
  }

  if (stack.length !== 0) {
    result.push("NO");
    continue;
  }

  result.push("YES");
}

console.log(result.join("\n"));
