// https://www.acmicpc.net/problem/10845
// 큐
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let commands = fs.readFileSync(filePath).toString().trim().split("\n");
commands.shift();

class Queue {
  constructor() {
    this.array = [];
    this.head = 0;
    this.tail = 0;
  }
  push(x) {
    this.array[this.tail++] = x;
  }
  pop() {
    if (this.head == this.tail) return -1;
    let element = this.array[this.head];
    delete this.array[this.head++];
    return element;
  }
  size() {
    return this.tail - this.head;
  }
  empty() {
    return this.head == this.tail ? "1" : "0";
  }
  front() {
    return this.head == this.tail ? "-1" : this.array[this.head];
  }
  back() {
    return this.head == this.tail ? "-1" : this.array[this.tail - 1];
  }
}

let output = "";
const q = new Queue();
for (let cmdLine of commands) {
  let [cmd, arg] = cmdLine.split(" ");
  // process.stdout.write(cmdLine + " - ");
  switch (cmd) {
    case "push":
      q.push(arg);
      break;
    case "pop":
      output += q.pop() + "\n";
      break;
    case "size":
      output += q.size() + "\n";
      break;
    case "empty":
      output += q.empty() + "\n";
      break;
    case "front":
      output += q.front() + "\n";
      break;
    case "back":
      output += q.back() + "\n";
      break;
  }
}
console.log(output);
