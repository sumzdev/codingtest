// https://www.acmicpc.net/problem/10828
// 스택

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// string array
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");
let [, ...cmds] = lineInput;

class Stack extends Array {
  empty() {
    return this.length == 0 ? 1 : 0;
  }
  top() {
    return this.empty() ? -1 : this[this.length - 1];
  }
  size() {
    return this.length;
  }
}

let stack = new Stack();
let res = [];
cmds.forEach((cmd) => {
  let command = cmd.split(" ");
  switch (command[0]) {
    case "push":
      stack.push(+command[1]);
      break;
    case "pop":
      res.push(stack.empty() ? -1 : stack.pop());
      break;
    case "empty":
      res.push(stack.empty());
      break;
    case "top":
      res.push(stack.top());
      break;
    case "size":
      res.push(stack.size());
      break;
  }
});
console.log(res.join("\n"));
