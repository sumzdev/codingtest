// https://www.acmicpc.net/problem/1753
// 최단경로
// 골드 4
// 최단경로, 다익스트라, 그래프
// 231024

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
const INF = Number.MAX_SAFE_INTEGER;

class Node {
  constructor({ to, distance }) {
    this.to = to;
    this.distance = distance;
  }
}

class PriorityQueue {
  constructor(priorityCompareFn) {
    this.queue = [];
    this.priorityCompareFn =
      priorityCompareFn !== undefined
        ? priorityCompareFn
        : (nodeA, nodeB) => nodeA - nodeB;
  }
  get size() {
    return this.queue.length;
  }
  parentIndex(index) {
    return parseInt((index - 1) / 2); // (index - 1) >> 1;
  }
  leftChildIndex(index) {
    const idx = index * 2 + 1; //  (index << 1) + 1;
    return idx >= this.size ? -1 : idx;
  }
  rightChildIndex(index) {
    const idx = index * 2 + 2; //  (index << 1) + 1;
    return idx >= this.size ? -1 : idx;
  }
  swap(nodeIdx1, nodeIdx2) {
    let tmp = this.queue[nodeIdx1];
    this.queue[nodeIdx1] = this.queue[nodeIdx2];
    this.queue[nodeIdx2] = tmp;
  }
  enqueue(node) {
    this.queue.push(node);
    let curIdx = this.size - 1;
    let parentIdx = this.parentIndex(curIdx);

    const checkCurNodeHigherPriorityThanParent = () =>
      this.priorityCompareFn(this.queue[curIdx], this.queue[parentIdx]);

    while (parentIdx !== -1 && checkCurNodeHigherPriorityThanParent()) {
      this.swap(curIdx, parentIdx);
      curIdx = parentIdx;
      parentIdx = this.parentIndex(curIdx);
    }
  }
  dequeue() {
    if (this.size === 0) return null;

    this.swap(0, this.size - 1);
    const poppedNode = this.queue.pop();

    let curIdx = 0;
    let leftChildIdx = this.leftChildIndex(curIdx);
    let rightChildIdx = this.rightChildIndex(curIdx);

    const checkChildHigherPriorityThanParent = () =>
      (leftChildIdx !== -1 &&
        this.priorityCompareFn(this.queue[leftChildIdx], this.queue[curIdx])) ||
      (rightChildIdx !== -1 &&
        this.priorityCompareFn(this.queue[rightChildIdx], this.queue[curIdx]));

    const getHigherPriorityChildIdx = () =>
      rightChildIdx !== -1 &&
      this.priorityCompareFn(
        this.queue[rightChildIdx],
        this.queue[leftChildIdx]
      )
        ? rightChildIdx
        : leftChildIdx;

    while (checkChildHigherPriorityThanParent()) {
      const childIdxToChange = getHigherPriorityChildIdx();
      this.swap(childIdxToChange, curIdx);

      curIdx = childIdxToChange;
      leftChildIdx = this.leftChildIndex(curIdx);
      rightChildIdx = this.rightChildIndex(curIdx);
    }
    return poppedNode;
  }
}

/**
 * 다익스트라 알고리즘 (2) 우선순위 큐 사용 - O(N^2)
 * - 최단 거리 찾기 (단방향 가중치 그래프)
 *
 * @param {number} N 정점 수
 * @param {[number, number, number][]} edgeList [시작노드, 도착노드, 거리][]
 * @param {number} startNode 1 이상 ~ N 이하
 * @returns
 */
function dijkstra(N, edgeList, startNode) {
  // 그래프 생성 : {to:number, distance:number}[]
  const graph = Array.from({ length: N + 1 }, () => []);
  edgeList.forEach(([nodeFrom, nodeTo, distance]) => {
    graph[nodeFrom].push({ to: nodeTo, distance }); // 방향 그래프
  });
  // console.log(graph);

  const distanceList = Array(N + 1).fill(INF);
  distanceList[startNode] = 0;
  // console.log("distanceList", distanceList);

  const priorityCompareFn = (nodeA, nodeB) =>
    nodeA["distance"] < nodeB["distance"];
  const pq = new PriorityQueue(priorityCompareFn);
  pq.enqueue({ to: startNode, distance: 0 });

  while (pq.size > 0) {
    const curNode = pq.dequeue();
    // console.log("pop", curNode.to, curNode.distance);

    graph[curNode.to].forEach((targetNode) => {
      const targetDistance = curNode.distance + targetNode.distance;

      if (distanceList[targetNode.to] > targetDistance) {
        distanceList[targetNode.to] = targetDistance;
        pq.enqueue({ to: targetNode.to, distance: targetDistance });
      }
    });
    // console.log(distanceList);
    // console.log("pq", pq.queue);
  }

  return distanceList
    .slice(1)
    .map((v) => (v === INF ? "INF" : v))
    .join("\n")
    .trim();
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, startNode, ...numberList] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);
  console.log(
    dijkstra(
      N,
      numberList.map((v) => v.split(" ").map(Number)),
      +startNode
    )
  );
}
