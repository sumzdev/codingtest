<h1>힙 (Heap)</h1>

목차

1. <a href="#maximum_heap">최대힙</a>
2. <a href="#maximum_heap">최소힙</a>

<h2 id="maximum-heap">최대힙 (Maximum Heap)</h2>

- 완전 이진 트리 구조
- 부모 노드의 값이 자식 노드의 값보다 큼
- 삭제 : 루트 값 리턴

  - 마지막 요소(현재값)을 루트로 가져오기
  - (반복) 자식 중 현재값보다 큰 값을 가지는 자식이 있다면 swap

- 삽입
  - 마지막 자리에 노드 추가
  - (반복) 삽입한 값이 부모보다 큰 값을 가지는 경우 swap

```javascript
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
```

<h2 id="minimum-heap">최소힙 (Minimum Heap)</h2>

```javascript
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
  // if (this.size === 0) {
  // console.log("empty");
  // return;
  // }

  // const copy = [...this.list];
  // let cnt = 1;
  // let idx = 0;

  // while (idx < this.size) {
  // copy[idx] = `${copy[idx]}\n`;
  // cnt \*= 2;
  // idx += cnt;
  // }
  // console.log(copy.join(" "));
  // }
}
```
