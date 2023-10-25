// https://www.acmicpc.net/problem/14938
// 서강그라운드
// 골드 4
// 최단 경로, 플로이드-워셜
// 231025

// ---------------------------------------
// 양방향
// 최대로 얻을 수 있는 아이템 개수(numOfItems) 구하기
// 지역 수    : 1 <= numOfNodes <= 100
// 수색 범위  : 1 <= searchRange <= 15
// 길의 개수  : 1 <= numOfRoad <= 100
// 길의 길이  : 1 <= distance <= 15
// 지역(노드)의 아이템 수 : 1 <= item <= 30
// 지역 번호  : 1 <= node <= numOfNodes

// numOfNodes searchRange numOfRoad
// item[numOfNodes]
// (nodeA nodeB distance)[numOfRoad]
// ---------------------------------------
const fs = require("fs");
const INF = Number.MAX_SAFE_INTEGER;
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
  const [info, itemList, ...edgeList] = inputString.trim().split("\n");
  const [numOfNodes, searchRange, numOfRoad] = info.split(" ").map(Number);

  console.log(
    floydWarshall(
      numOfNodes,
      searchRange,
      itemList.split(" ").map(Number),
      edgeList.map((v) => v.split(" ").map(Number))
    )
  );
}
// ---------------------------------------
function floydWarshall(numOfNodes, searchRange, itemList, edgeList) {
  const graph = Array.from({ length: numOfNodes }, () =>
    Array(numOfNodes).fill(INF)
  );
  Array.from({ length: numOfNodes }).forEach((_, i) => (graph[i][i] = 0));
  edgeList.forEach(([from, to, distance]) => {
    graph[from - 1][to - 1] = distance;
    graph[to - 1][from - 1] = distance;
  });
  for (let k = 0; k < numOfNodes; k += 1) {
    for (let i = 0; i < numOfNodes; i += 1) {
      for (let j = 0; j < numOfNodes; j += 1) {
        if (i === j || i === k || j === k) continue;
        if (graph[i][j] > graph[i][k] + graph[k][j]) {
          graph[i][j] = graph[i][k] + graph[k][j];
        }
      }
    }
  }
  // console.log(graph);

  // 시작 위치 당 얻을 수 있는 아이템 수 구하기 -> 최대 아이템 수 구하기
  let maxItems = 0;
  for (let startNode = 0; startNode < numOfNodes; startNode += 1) {
    const sumItems = graph[startNode].reduce(
      (sumItems, dist, node) =>
        dist <= searchRange ? sumItems + itemList[node] : sumItems,
      0
    );
    maxItems = Math.max(maxItems, sumItems);
  }
  return maxItems;
}
