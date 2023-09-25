<h1>힙 (Heap)</h1>

목차

1. <a href="#min-max-heap">최대힙/최소힙</a>

<h2 id="min-max-heap">최대힙(Maximum Heap) / 최소힙 (Minimum Heap)</h2>

- 완전 이진 트리 구조
- 부모 노드의 값이 자식 노드의 값보다 큼
- 삭제 : 루트 값 리턴

  - 마지막 요소(현재값)을 루트로 가져오기
  - (반복) 자식 중 현재값보다 (큰/작은) 값을 가지는 자식이 있다면 swap

- 삽입
  - 마지막 자리에 노드 추가
  - (반복) 삽입한 값이 부모보다 (큰/작은) 값을 가지는 경우 swap

```javascript
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
```

- 이중 우선순위 큐 문제 : 7662
