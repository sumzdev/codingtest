// https://www.acmicpc.net/problem/1935
// 후위 표기식

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let infix = fs.readFileSync(filePath).toString().trim();

function getPriority(operator) {
  switch (operator) {
    case "*":
    case "/":
      return 2;
    case "+":
    case "-":
      return 1;
    default:
      return 0;
  }
}

let operators = [];
let operands = [];

const add = () => {
  let op2 = operands.pop();
  let op1 = operands.pop();
  operands.push(op1 + op2 + operators.pop());
};

for (let i = 0; i < infix.length; i++) {
  if (infix[i] == "(") {
    operators.push(infix[i]);
  } else if (infix[i] == ")") {
    while (operators.length != 0 && operators.at(-1) != "(") {
      add();
    }
    operators.pop();
  } else if (/[A-Z]/.test(infix[i])) {
    operands.push(infix[i]);
  } else {
    while (
      operators.length &&
      getPriority(infix[i]) <= getPriority(operators.at(-1))
    ) {
      add();
    }
    operators.push(infix[i]);
  }
}

while (operators.length != 0) {
  add();
}

console.log(operands.pop());
