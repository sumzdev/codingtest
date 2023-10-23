// https://www.acmicpc.net/problem/18352
// 특정 거리의 도시 찾기
// 실버 2
// 최단 거리, 그래프, 너비 우선 탐색
// 231023

// 가중치 없는 최단거리 찾기 -> BFS

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
      "./input4.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...numberList] = inputString.trim().split("\n");
  const [N, M, K, startN] = info.split(" ").map(Number);
  console.log(
    findShortestDistanceKNodes(
      N,
      M,
      K,
      startN,
      numberList.map((v) => v.split(" ").map(Number))
    )
  );
}
// ---------------------------------------
/**
 * 시작 노드에서 최단 거리가 K인 노드들 찾기
 *
 * @param {number} N 노드 수 : 2 ≤ N ≤ 300,000
 * @param {number} M 간선 수 : 1 ≤ M ≤ 1,000,000
 * @param {number} K 최단 거리 목표 값 : 1 ≤ N ≤ 300,000
 * @param {number} startNode 시작 노드
 * @param {[number, number][]} edgeList 간선 정보 (가중치 x)
 * @returns 최단 거리가 K인 노드들 or 없는 경우 -1
 */
function findShortestDistanceKNodes(N, M, K, startNode, edgeList) {
  // console.log(N, M, K, startNode, edgeList);

  // 노드 별 인접한 노드 정보 그래프 구성
  const graph = Array.from({ length: N + 1 }).map((v) => []);
  edgeList.forEach(([from, to]) => graph[from].push(to));
  // console.log(graph);

  const distanceList = Array.from({ length: N + 1 }).fill(-1);
  const kDistanceList = [];

  // BFS
  (() => {
    const queue = [startNode];
    distanceList[startNode] = 0;

    while (queue.length > 0) {
      const curNode = queue.shift();
      // console.log(curNode, queue, distanceList);
      if (distanceList[curNode] === K) {
        kDistanceList.push(curNode);
        continue;
      }
      graph[curNode].forEach((nextNode) => {
        if (distanceList[nextNode] === -1) {
          queue.push(nextNode);
          distanceList[nextNode] = distanceList[curNode] + 1;
        }
        // console.log("=>", curNode, nextNode, queue, distanceList);
      });
    }
  })();

  return kDistanceList.length === 0
    ? "-1"
    : kDistanceList
        .sort((a, b) => a - b)
        .join("\n")
        .trim();
}
