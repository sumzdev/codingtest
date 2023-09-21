// https://www.acmicpc.net/problem/2075
// 실버 2
// N번째 큰 수
// 230920

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

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
    while (parentIdx !== -1 && this.list[parentIdx] > this.list[curIdx]) {
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
      (this.list[leftIdx] < this.list[curIdx] ||
        this.list[rightIdx] < this.list[curIdx])
    ) {
      const indexToChange =
        rightIdx !== -1 && this.list[rightIdx] < this.list[leftIdx]
          ? rightIdx
          : leftIdx;

      this.swap(curIdx, indexToChange);
      curIdx = indexToChange;
      leftIdx = this.leftChildIndex(curIdx);
      rightIdx = this.rightChildIndex(curIdx);
    }

    return min;
  }
  // print() {
  //   if (this.size === 0) {
  //     console.log("empty");
  //     return;
  //   }

  //   const copy = [...this.list];
  //   let cnt = 1;
  //   let idx = 0;

  //   while (idx < this.size) {
  //     copy[idx] = `${copy[idx]}\n`;
  //     cnt *= 2;
  //     idx += cnt;
  //   }
  //   console.log(copy.join(" "));
  // }
}
let N;
const heap = new Heap();

rl.question("", (inputLine) => {
  N = +inputLine;

  rl.on("line", (inputLine) => {
    if (inputLine === "") rl.close();

    inputLine.split(" ").forEach((v) => {
      heap.push(+v);
      if (heap.size > N) heap.pop();
    });
  }).on("close", function () {
    console.log(heap.list[0]);
    process.exit();
  });
});
