// https://www.acmicpc.net/problem/11279
// 실버 2
// 최대 힙
// 230920

const fs = require("fs");

class Heap {
  constructor() {
    this.list = [];
  }
  getParentIndex(index) {
    return (index - 1) >> 1;
  }
  getLeftChildIndex(index) {
    const idx = (index << 1) + 1;
    return idx > this.size() ? -1 : idx;
  }
  getRightChildIndex(index) {
    const idx = (index << 1) + 2;
    return idx > this.size() ? -1 : idx;
  }
  size() {
    return this.list.length;
  }
  swap(idx1, idx2) {
    [this.list[idx1], this.list[idx2]] = [this.list[idx2], this.list[idx1]];
  }
  push(v) {
    this.list.push(v);

    let curIdx = this.list.length - 1;
    let parentIdx = this.getParentIndex(curIdx);

    while (parentIdx !== -1 && this.list[parentIdx] < this.list[curIdx]) {
      this.swap(parentIdx, curIdx);
      curIdx = parentIdx;
      parentIdx = this.getParentIndex(curIdx);
    }
  }
  pop() {
    if (this.size() === 0) return 0;

    this.swap(0, this.size() - 1);
    const max = this.list.pop();

    let curIdx = 0;
    let leftIdx = this.getLeftChildIndex(curIdx);
    let rightIdx = this.getRightChildIndex(curIdx);

    // undefined > undefined는 false
    // 따라서 pop한 결과가 빈 배열이어도 아래 while문 조건은 false
    while (
      this.list[leftIdx] > this.list[curIdx] ||
      this.list[rightIdx] > this.list[curIdx]
      // 적어도 leftIdx는 -1이 아님
      // =(적어도 list[leftIdx]는 undefined가 아님)
    ) {
      const indexToSwap =
        this.list[leftIdx] < this.list[rightIdx] ? rightIdx : leftIdx;
      // undefined > number : 항상 false
      this.swap(indexToSwap, curIdx);

      curIdx = indexToSwap;
      leftIdx = this.getLeftChildIndex(curIdx);
      rightIdx = this.getRightChildIndex(curIdx);
    }

    return max;
  }
  print() {
    if (this.size() === 0) {
      console.log("empty");
      return;
    }

    const copy = [...this.list];
    let cnt = 1;
    let idx = 0;

    while (idx < this.size()) {
      copy[idx] = `${copy[idx]}\n`;
      cnt *= 2;
      idx += cnt;
    }
    console.log(copy.join(" "));
  }
}

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt", // 10 5 4
      "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");
  run({ N: +N, list: input.map(Number) });
}

function run({ N, list }) {
  // console.log(N, list);

  const heap = new Heap();
  let res = "";

  for (const v of list) {
    // console.log("# ", v);
    if (v === 0) {
      res += heap.pop() + "\n";
      continue;
    }
    heap.push(v);
    // heap.print();
  }
  console.log(res.trim());
}
