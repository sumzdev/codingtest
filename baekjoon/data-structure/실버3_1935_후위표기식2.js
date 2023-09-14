// https://www.acmicpc.net/problem/1935
// 후위 표기식2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let [n, postfix, ...nums] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n");

// A..Z -> num
let char = "A".codePointAt(0);
let alpha = {};
nums.forEach((v) => (alpha[String.fromCodePoint(char++)] = +v));

function calc(op1, op2, oper) {
  op1 = Object.keys(alpha).includes(op1) ? alpha[op1] : op1;
  op2 = Object.keys(alpha).includes(op2) ? alpha[op2] : op2;
  switch (oper) {
    case "+":
      return op1 + op2;
    case "-":
      return op1 - op2;
    case "*":
      return op1 * op2;
    case "/":
      return op1 / op2;
  }
}

// calculate postfix
let stack = [];
for (let i = 0; i < postfix.length; i++) {
  let c = postfix[i];

  if (/[^A-Z]/.test(c)) {
    let op2 = stack.pop();
    let op1 = stack.pop();
    stack.push(calc(op1, op2, c));
  } else {
    stack.push(c);
  }
}

console.log(stack.pop().toFixed(2));
