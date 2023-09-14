// https://www.acmicpc.net/problem/18258
// 실버 4
// 큐 2

// 배열로 하면 메모리 초과 -> Node 구현
// 출력 로그 배열로 하면 메모리 초과 -> 문자열

const fs = require("fs");

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }
  push(value) {
    const node = new Node(value);

    if (this.length === 0) this.first = node;
    else this.last.next = node;

    this.last = node;
    this.length = this.length + 1;
  }
  pop() {
    if (this.length > 0) {
      const value = this.first.value;
      this.first = this.first.next;
      this.length = this.length - 1;

      if (this.length === 0) {
        this.last = null;
      }
      return value;
    }
    return -1;
  }
  front() {
    return this.first ? this.first.value : -1;
  }
  back() {
    return this.last ? this.last.value : -1;
  }
}

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : ["./input1.txt", "./input2.txt"];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function processInput(inputArr) {
  const [N, ...cmdList] = inputArr;

  return {
    N: +inputArr[0],
    cmdList: cmdList.map((v) => v.split(" ")),
  };
}

function run(input) {
  const { cmdList } = processInput(input);
  // console.log(N, cmdList);

  let logs = "";
  const log = (s) => {
    logs += `${s}\n`;
  };

  const queue = new Queue();

  for (let [cmd, value] of cmdList) {
    switch (cmd) {
      case "push":
        queue.push(+value);
        break;
      case "pop":
        log(queue.pop());
        break;
      case "size":
        log(queue.length);
        break;
      case "empty":
        log(queue.length === 0 ? 1 : 0);
        break;
      case "front":
        log(queue.front());
        break;
      case "back":
        log(queue.back());
        break;
    }
  }

  console.log(logs.trim());
}
