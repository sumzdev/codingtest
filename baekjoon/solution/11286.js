// https://www.acmicpc.net/problem/11286
// 실버 1
// 절댓값 힙
// 230924

// 추가 테스트
// https://www.acmicpc.net/board/view/106567

// ----제출-----------------------------------
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// ------------------------------------------
class Heap {
  constructor() {
    this.list = [];
  }
  swap(idx1, idx2) {
    let tmp = this.list[idx1];
    this.list[idx1] = this.list[idx2];
    this.list[idx2] = tmp;
    // 메모리 초과
    // [this.list[idx1], this.list[idx2]] = [this.list[idx2], this.list[idx1]];
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
  push(v) {
    this.list.push(v);

    let curIdx = this.size - 1;
    let parentIdx = this.parentIndex(curIdx);
    while (
      parentIdx !== -1 &&
      (Math.abs(this.list[parentIdx]) > Math.abs(this.list[curIdx]) ||
        (Math.abs(this.list[parentIdx]) === Math.abs(this.list[curIdx]) &&
          this.list[parentIdx] > this.list[curIdx]))
    ) {
      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
      parentIdx = this.parentIndex(curIdx);
    }
  }
  pop() {
    if (this.size === 0) return 0;

    this.swap(0, this.size - 1);
    const min = this.list.pop();

    let curIdx = 0;
    let leftIdx = this.leftChildIndex(curIdx);
    let rightIdx = this.rightChildIndex(curIdx);

    while (
      leftIdx !== -1 &&
      (Math.abs(this.list[rightIdx]) <= Math.abs(this.list[curIdx]) ||
        Math.abs(this.list[leftIdx]) <= Math.abs(this.list[curIdx]))
    ) {
      let indexToChange =
        rightIdx === -1
          ? leftIdx
          : Math.abs(this.list[rightIdx]) === Math.abs(this.list[leftIdx])
          ? this.list[rightIdx] < this.list[leftIdx]
            ? rightIdx
            : leftIdx
          : Math.abs(this.list[rightIdx]) < Math.abs(this.list[leftIdx])
          ? rightIdx
          : leftIdx;

      if (
        Math.abs(this.list[indexToChange]) === Math.abs(this.list[curIdx]) &&
        this.list[indexToChange] > this.list[curIdx]
      ) {
        break;
      }

      this.swap(curIdx, indexToChange);
      curIdx = indexToChange;
      leftIdx = this.leftChildIndex(curIdx);
      rightIdx = this.rightChildIndex(curIdx);
    }

    return min;
  }
  print() {
    if (this.size === 0) {
      console.log("empty");
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

// -----제출----------------------------------
rl.question("", (inputLine) => {
  const N = +inputLine;
  const minHeap = new Heap();
  let result = "";

  rl.on("line", (inputLine) => {
    if (inputLine === "") rl.close();

    if (+inputLine === 0) {
      result += minHeap.pop() + "\n";
    } else {
      minHeap.push(+inputLine);
    }
    console.log(">>", inputLine);
    console.log("-------s");
    minHeap.print();
    console.log("-------e");
  }).on("close", function () {
    console.log(result.trim());
    process.exit();
  });
});
