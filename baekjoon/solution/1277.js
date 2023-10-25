// https://www.acmicpc.net/problem/1277
// 발전소 설치
// 골드 4
// 최단경로, 다익스트라
// 231025

// ---------------------------------------
// max javascript Array length : 2^32 - 1 : 4294967295

// 양방향
// 발전소 개수 : 1 <= numOfNodes <= 1000
// 남은 전선수 : 1 <= numOfEdges <= 10000
// 제한 길이  : 0.0 <= limitedLen <= 200000.0
// 좌표 범위  : -100000 <= xi, yi <= 100000

// 입력
// numOfNodes numOfEdges
// (xi yi)[numOfNodes]
// (nodeA nodeB)[numOfEdges]

// 1번 발전소와 N(numOfNodes)번 발전소를 잇는데 필요한 추가 전선 길이의 최솟값
// 1000배 (소수점 버리기)
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
  const [info, limitedLen, ...input] = inputString.trim().split("\n");
  const [numOfNodes, numOfEdges] = info.split(" ").map(Number);

  const nodeInfo = input
    .slice(0, numOfNodes)
    .map((v) => v.split(" ").map(Number));
  const edgeList = input.slice(numOfNodes).map((v) => v.split(" ").map(Number));

  console.log(dijkstra(numOfNodes, +limitedLen, nodeInfo, edgeList));
}
// ---------------------------------------
function getLenBetweenTwoPoints([fromX, fromY], [toX, toY]) {
  return Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2);
}

function makedistanceGraphAndWireGraph(
  numOfNodes,
  limitedLen,
  nodeInfo,
  edgeList
) {
  // 전체 지점(노드) 간 거리 표시 그래프 (2차원 배열)
  // - 길이가 limitedLen를 초과할 경우 INF
  const distanceGraph = Array.from({ length: numOfNodes + 1 }, () =>
    Array(numOfNodes + 1).fill(INF)
  );

  // distance를 중복 계산하지 않도록 방문 체크하기 위함
  const visited = Array.from({ length: numOfNodes + 1 }, () =>
    Array(numOfNodes + 1).fill(false)
  );

  // 연결 가능 범위의 wire 또는 이미 있는 전선 정보
  // const wireGraph = Array.from({ length: numOfNodes + 1 }, () => new Set());
  const wireGraph = Array.from({ length: numOfNodes + 1 }, () => []);

  Array.from({ length: numOfNodes }).forEach((_, i) => {
    distanceGraph[i + 1][i + 1] = 0;
    visited[i + 1][i + 1] = true;
  });
  edgeList.forEach(([fromNode, toNode]) => {
    wireGraph[fromNode].push(toNode);
    wireGraph[toNode].push(fromNode);

    visited[fromNode][toNode] = true;
    visited[toNode][fromNode] = true;

    // 이미 존재하는 전선이므로 거리 0으로 설정
    distanceGraph[fromNode][toNode] = 0;
    distanceGraph[toNode][fromNode] = 0;
  });

  for (let fromNode = 1; fromNode <= numOfNodes; fromNode += 1) {
    for (let toNode = 1; toNode <= numOfNodes; toNode += 1) {
      if (visited[fromNode][toNode] || visited[toNode][fromNode]) continue;

      let distance = getLenBetweenTwoPoints(
        nodeInfo[fromNode - 1],
        nodeInfo[toNode - 1]
      );

      if (distance <= limitedLen) {
        distanceGraph[fromNode][toNode] = distance;
        distanceGraph[toNode][fromNode] = distance;

        // limit를 초과하지 않는 distance인 경우 wire 존재한다고 표시
        wireGraph[fromNode].push(toNode);
        wireGraph[toNode].push(fromNode);

        visited[fromNode][toNode] = true;
        visited[toNode][fromNode] = true;
      }
    }
  }

  return { distanceGraph, wireGraph };
}

function printGraph(graph) {
  const formattedGraph = graph
    .map((row) =>
      row
        .map((v) =>
          v === INF
            ? "INF."
            : v === true
            ? "1"
            : v === false
            ? "0"
            : v.toFixed(2)
        )
        .join(" ")
    )
    .join("\n");
  console.log(formattedGraph);
}

function dijkstra(numOfNodes, limitedLen, nodeInfo, edgeList) {
  // console.log(numOfNodes, limitedLen, nodeInfo, edgeList);

  const { distanceGraph, wireGraph } = makedistanceGraphAndWireGraph(
    numOfNodes,
    limitedLen,
    nodeInfo,
    edgeList
  );
  // printGraph(distanceGraph);
  // console.log(wireGraph);

  const distanceList = Array(numOfNodes + 1).fill(INF);
  distanceList[1] = 0;

  const pq = [{ to: 1, distance: 0 }];

  while (pq.length) {
    // console.log("===== curNode", curNode.to, pq);
    const curNode = pq.pop();

    wireGraph[curNode.to].forEach((to) => {
      const targetDistance =
        distanceList[curNode.to] + distanceGraph[curNode.to][to];

      if (distanceList[to] > targetDistance) {
        distanceList[to] = targetDistance;
        pq.push({ to, distance: distanceGraph[curNode.to][to] });
      }
    });
  }
  // console.log(distanceList);
  return parseInt(distanceList[numOfNodes] * 1000);
}
