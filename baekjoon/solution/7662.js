// https://www.acmicpc.net/problem/7662
// 골드 4
// 이중 우선순위 큐
// 230925

// 추가 테스트
// https://www.acmicpc.net/board/view/127182

// ------------------------------------------
// 시도 1: minHeap 하나 사용 + max의 경우 leafNodes 계산 로직 사용
// ------------------------------------------
// 시도 2: 배열 정렬
// ------------------------------------------
// [성공]
// minHeap과 maxHeap 둘 다 사용
// 유효한 값인지를 판단할 수 있는 valid 사용

// ------------------------------------------
// const fs = require("fs");
// ----제출-----------------------------------
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
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
        ? () => this.list[parentIdx] > this.list[curIdx]
        : () => this.list[parentIdx] < this.list[curIdx];

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
            this.list[leftIdx] < this.list[curIdx] ||
            this.list[rightIdx] < this.list[curIdx]
        : () =>
            this.list[leftIdx] > this.list[curIdx] ||
            this.list[rightIdx] > this.list[curIdx];
    const indexToChangeByType =
      this.type === "min"
        ? () => this.list[rightIdx] < this.list[leftIdx]
        : () => this.list[rightIdx] > this.list[leftIdx];

    while (leftIdx !== -1 && checkConditionByType()) {
      const indexToChange =
        rightIdx !== -1 && indexToChangeByType() ? rightIdx : leftIdx;

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

    const copy = [...this.list];
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
  push(v) {
    const value = +v;
    this.size += 1;
    this.minHeap.push(value);
    this.maxHeap.push(value);
    this.valid[value] = this.valid[value] ? this.valid[value] + 1 : 1;
  }
  popMin() {
    let popped = EMPTY;
    while (this.minHeap.size > 0 && (popped = this.minHeap.pop()) !== EMPTY) {
      if (this.valid[popped] > 0) {
        this.valid[popped] -= 1;
        break;
      }
    }
    this.removeInvalidMax();

    if (this.size === 0) return EMPTY;
    this.size -= 1;

    return popped;
  }
  popMax() {
    let popped = EMPTY;
    while (this.maxHeap.size > 0 && (popped = this.maxHeap.pop()) !== EMPTY) {
      if (this.valid[popped] > 0) {
        this.valid[popped] -= 1;
        break;
      }
    }
    this.removeInvalidMin();

    if (this.size === 0) return EMPTY;
    this.size -= 1;

    return popped;
  }
  removeInvalidMin() {
    // minHeap에서 root가 유효하지 않은 경우 제거
    while (this.minHeap.size > 0 && this.valid[this.minHeap.list[0]] === 0) {
      this.minHeap.pop();
    }
  }
  removeInvalidMax() {
    while (this.maxHeap.size > 0 && this.valid[this.maxHeap.list[0]] === 0) {
      this.maxHeap.pop();
    }
  }
  getMin() {
    this.removeInvalidMin();
    return this.minHeap.list[0];
  }
  getMax() {
    this.removeInvalidMax();
    return this.maxHeap.list[0];
  }
  getMinAndMax() {
    if (this.size === 0) return EMPTY;
    return `${this.getMax()} ${this.getMin()}`;
  }
  print() {
    console.log("=======print=======start");
    console.log("min=======start");
    this.minHeap.print();
    // console.log(this.minHeap.list);
    console.log("min=======end");
    console.log("max=======start");
    this.maxHeap.print();
    // console.log(this.maxHeap.list);
    console.log("max=======end");
    console.log("valid=======start");
    console.log(this.valid);
    console.log("valid=======end");
    console.log("=======print=======end=======");
  }
}

// -----제출----------------------------------
rl.question("", (inputLine) => {
  const T = +inputLine;
  let cntT = 0;

  let commandNum = 0;
  let cntCommandNum = 0;

  let doubleHeap;
  let result = "";

  rl.on("line", (inputLine) => {
    // if (inputLine === "") rl.close();

    if (cntCommandNum === 0) {
      // init
      doubleHeap = new DoubleHeap();
      commandNum = +inputLine;
    } else {
      const [cmd, value] = inputLine.split(" ");

      if (cmd === "I") doubleHeap.push(value);
      else if (value === "-1") {
        doubleHeap.popMin();
      } else if (value === "1") {
        doubleHeap.popMax();
      }
    }
    // doubleHeap.print();

    if (cntCommandNum === commandNum) {
      result += doubleHeap.getMinAndMax() + "\n";
      cntCommandNum = 0;
      cntT += 1;
      if (cntT === T) rl.close();
    } else {
      cntCommandNum += 1;
    }
  }).on("close", function () {
    console.log(result.trim());
    process.exit();
  });
});

// ---------------------------------------
// const isTest = process.platform !== "linux";
// const inputFilePaths = !isTest
//   ? ["/dev/stdin"]
//   : [
//       // "./input1.txt",
//       // "./input2.txt",
//       // "./input3.txt",
//       // "./input4.txt",
//       "./input5.txt",
//     ];

// for (let filePath of inputFilePaths) {
//   if (isTest) console.log("==============", filePath);
//   const inputString = fs.readFileSync(filePath).toString();

//   const input = inputString.trim().split("\n");
//   let T = +input[0];

//   let result = "";
//   let cursor = 1;

//   while (T--) {
//     const cmdLine = +input[cursor++];
//     const heap = new DoubleHeap();

//     for (let i = 0; i < cmdLine; i++) {
//       const [cmd, value] = input[cursor].split(" ");

//       if (cmd === "I") heap.push(+value);
//       else if (value === "-1") {
//         heap.popMin();
//       } else if (value === "1") {
//         heap.popMax();
//       }

//       // test
//       // heap.print();
//       cursor++;
//       continue;
//     }

//     result += heap.getMinAndMax() + "\n";
//   }
//   console.log(result.trim());
// }
