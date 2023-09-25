// https://www.acmicpc.net/problem/21939
// 골드 4
// 문제 추천 시스템 Version 1
// 230925

// 11286 - 다중 조건 우선순위 큐
// 7662 - min + max 우선순위 큐 (minHeap + maxHeap)
// 위 두개 그대로 합친 문제

// ----제출-----------------------------------
const fs = require("fs");
// ----제출-----------------------------------
// const readline = require("readline");
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout,
// });
// ------------------------------------------
const EMPTY = "EMPTY";

class Heap {
  constructor(type) {
    this.type = type; // "min" | "max"
    this.list = [];
  }
  swap(idx1, idx2) {
    let tmp = this.list[idx1];
    this.list[idx1] = this.list[idx2];
    this.list[idx2] = tmp;
  }
  parentIndex(index) {
    return (index - 1) >> 1;
  }
  leftChildIndex(index) {
    const idx = (index << 1) + 1;
    return idx >= this.size ? -1 : idx;
  }
  rightChildIndex(index) {
    const idx = (index << 1) + 2;
    return idx >= this.size ? -1 : idx;
  }
  get size() {
    return this.list.length;
  }
  init() {
    this.list = [];
  }
  push(v) {
    this.list.push(v);

    let curIdx = this.size - 1;
    let parentIdx = this.parentIndex(curIdx);

    const checkConditionByType =
      this.type === "min"
        ? () =>
            this.list[parentIdx].level > this.list[curIdx].level ||
            (this.list[parentIdx].level === this.list[curIdx].level &&
              this.list[parentIdx].questionNum > this.list[curIdx].questionNum)
        : () =>
            this.list[parentIdx].level < this.list[curIdx].level ||
            (this.list[parentIdx].level === this.list[curIdx].level &&
              this.list[parentIdx].questionNum < this.list[curIdx].questionNum);

    while (parentIdx !== -1 && checkConditionByType()) {
      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
      parentIdx = this.parentIndex(curIdx);
    }
  }
  pop() {
    if (this.size === 0) return EMPTY;

    this.swap(0, this.size - 1);
    const popped = this.list.pop(); // min 또는 max

    let curIdx = 0;
    let leftIdx = this.leftChildIndex(curIdx);
    let rightIdx = this.rightChildIndex(curIdx);

    const checkConditionByType =
      this.type === "min"
        ? () =>
            this.list[leftIdx].level <= this.list[curIdx].level ||
            (rightIdx !== -1 &&
              this.list[rightIdx].level <= this.list[curIdx].level)
        : () =>
            this.list[leftIdx].level >= this.list[curIdx].level ||
            (rightIdx !== -1 &&
              this.list[rightIdx].level >= this.list[curIdx].level);

    const indexToChangeByType =
      this.type === "min"
        ? () =>
            rightIdx === -1
              ? leftIdx
              : this.list[leftIdx].level === this.list[rightIdx].level
              ? this.list[rightIdx].questionNum < this.list[leftIdx].questionNum
                ? rightIdx
                : leftIdx
              : this.list[rightIdx].level < this.list[leftIdx].level
              ? rightIdx
              : leftIdx
        : () =>
            rightIdx === -1
              ? leftIdx
              : this.list[leftIdx].level === this.list[rightIdx].level
              ? this.list[rightIdx].questionNum > this.list[leftIdx].questionNum
                ? rightIdx
                : leftIdx
              : this.list[rightIdx].level > this.list[leftIdx].level
              ? rightIdx
              : leftIdx;

    while (leftIdx !== -1 && checkConditionByType()) {
      const indexToChange = indexToChangeByType();

      if (this.list[indexToChange].level === this.list[curIdx].level) {
        if (
          this.type === "min" &&
          this.list[indexToChange].questionNum > this.list[curIdx].questionNum
        )
          break;

        if (
          this.type === "max" &&
          this.list[indexToChange].questionNum < this.list[curIdx].questionNum
        )
          break;
      }

      this.swap(curIdx, indexToChange);
      curIdx = indexToChange;
      leftIdx = this.leftChildIndex(curIdx);
      rightIdx = this.rightChildIndex(curIdx);
    }

    return popped;
  }
  print() {
    if (this.size === 0) {
      console.log("[empty]");
      return;
    }

    const copy = [...this.list].map((v) => `${v.level}-${v.questionNum}`);
    let cnt = 1;
    let idx = 0;

    while (idx < this.size) {
      copy[idx] = `${copy[idx]}\n`;
      cnt *= 2;
      idx += cnt;
    }
    console.log(copy.join(" "));
  }
}

class DoubleHeap {
  constructor() {
    this.size = 0;
    this.valid = {};
    this.minHeap = new Heap("min");
    this.maxHeap = new Heap("max");
  }
  push(value) {
    this.size += 1;
    this.minHeap.push(value);
    this.maxHeap.push(value);
    this.valid[value.questionNum] = true;
  }
  pop(questionNum) {
    this.valid[questionNum] = false;
    this.removeInvalidMax();
    this.removeInvalidMin();
  }
  removeInvalidMin() {
    // minHeap에서 root가 유효하지 않은 경우 제거
    while (
      this.minHeap.size > 0 &&
      !this.valid[this.minHeap.list[0].questionNum]
    ) {
      this.minHeap.pop();
    }
  }
  removeInvalidMax() {
    // maxHeap에서 root가 유효하지 않은 경우 제거
    while (
      this.maxHeap.size > 0 &&
      !this.valid[this.maxHeap.list[0].questionNum]
    ) {
      this.maxHeap.pop();
    }
  }
  getMin() {
    this.removeInvalidMin();
    return this.minHeap.list[0].questionNum;
  }
  getMax() {
    this.removeInvalidMax();
    return this.maxHeap.list[0].questionNum;
  }
  print() {
    console.log("=======print=======start");
    console.log("min=======start");
    this.minHeap.print();
    console.log("max=======start");
    this.maxHeap.print();
    console.log("valid=======start");
    console.log(this.valid);
    console.log("=======print=======end=======");
  }
}

// -----제출----------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");

  const heap = new DoubleHeap();
  let result = "";
  let cursor = 0;

  const cntQuestionList = +input[cursor];
  while (++cursor <= cntQuestionList) {
    const [questionNum, level] = input[cursor].split(" ");
    heap.push({ level: +level, questionNum: +questionNum });
  }

  const cntCommandNum = +input[cursor];
  while (++cursor <= cntCommandNum + cntQuestionList + 1) {
    const cmd = input[cursor].split(" ");
    // console.log("##", cmd);

    if (cmd[0] === "add") {
      heap.push({ questionNum: +cmd[1], level: +cmd[2] });
    } else if (cmd[0] === "recommend") {
      if (cmd[1] === "-1") {
        result += heap.getMin() + "\n";
      } else {
        result += heap.getMax() + "\n";
      }
    } else if (cmd[0] === "solved") {
      heap.pop(+cmd[1]);
    }

    // heap.print();
  }

  console.log(result.trim());
}
