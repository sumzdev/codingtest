<h1>Binary Search (이분 탐색)</h1>

<h2>1. 정열 된 배열에서 특정 값 찾기</h2>

1. 배열의 중간 값 구하기
2. 중간 값과 찾으려는 값이 같다면 종료 (mid = target)
3. 중간 값보다 찾으려는 값이 크다면 (mid < target)
4. 중간 값보다 찾으려는 값이 작다면 (mid > target)
5. 반복
6. startIdx > endIdx면 배열에 찾으려는 값이 존재하지 않으므로 종료

```javascript
const binarySearchFunc = (startIdx, endIdx, target) => {
  // 배열에 해당 값이 존재하지 않음
  if (startIdx > endIdx) return "NO";

  // 중간 값 구하기
  const midIdx = startIdx + ((endIdx - startIdx) >> 1);

  // 찾은 경우
  if (sortedArray[midIdx] === target) return midIdx;
  // 중간 값 보다 큰 경우
  if (sortedArray[midIdx] < target)
    return binarySearchFunc(midIdx + 1, endIdx, target);
  // 중간 값 보다 작은 경우
  return binarySearchFunc(startIdx, midIdx - 1, target);
};

const binarySearchLoop = (startIdx, endIdx, target) => {
  while (startIdx <= endIdx) {
    const midIdx = startIdx + ((endIdx - startIdx) >> 1);

    // 찾은 경우
    if (sortedArray[midIdx] === target) return midIdx;

    // 중간 값 보다 큰 경우
    if (sortedArray[midIdx] < target) {
      startIdx = midIdx + 1;
    } else {
      endIdx = midIdx - 1;
    }
  }
  return "NO";
};

const sortedArray = [1, 2, 4, 6, 7, 9, 10, 12];

// Test
for (const value of [1, 2, 4, 6, 7, 9, 10, 12, 0, 13]) {
  const index = binarySearchFunc(0, sortedArray.length - 1, value);
  const index2 = binarySearchLoop(0, sortedArray.length - 1, value);
  console.log(index, index2);
}
```

### 시간 복잡도

- Best: O(1)
- Average: O(log n)
- Worst: O(log n)
