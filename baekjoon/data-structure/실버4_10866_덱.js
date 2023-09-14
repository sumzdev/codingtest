// https://www.acmicpc.net/problem/10866
// 덱
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

// string array
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");
let [, ...cmds] = lineInput;

class Deque extends Array {
  empty() {
    return this.length == 0 ? 1 : 0;
  }
  front() {
    return this.empty() ? -1 : this[0];
  }
  back() {
    return this.empty() ? -1 : this[this.length - 1];
  }
  size() {
    return this.length;
  }
  push_front(v) {
    this.unshift(v);
  }
  push_back(v) {
    this.push(v);
  }
  pop_front() {
    return this.empty() ? -1 : this.shift();
  }
  pop_back() {
    return this.empty() ? -1 : this.pop();
  }
}

let deque = new Deque();
let res = [];
cmds.forEach((cmd) => {
  let command = cmd.split(" ");
  switch (command[0]) {
    case "push_front":
      deque.push_front(+command[1]);
      break;
    case "push_back":
      deque.push_back(+command[1]);
      break;
    case "pop_front":
      res.push(deque.pop_front());
      break;
    case "pop_back":
      res.push(deque.pop_back());
      break;
    case "size":
      res.push(deque.size());
      break;
    case "empty":
      res.push(deque.empty());
      break;
    case "front":
      res.push(deque.front());
      break;
    case "back":
      res.push(deque.back());
      break;
  }
});
console.log(res.join("\n"));
