// https://www.acmicpc.net/problem/1707
// 이분 그래프
// 골드 4

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();
// const inputString = `2
// 3 2
// 1 3
// 2 3
// 4 4
// 1 2
// 2 3
// 3 4
// 4 2`;
// YES
// NO

const input = inputString.trim().split("\n");
const numOfTestcase = +input[0];
const testcases = []; // {cntVertices, graph}
(function extraction() {
  let curLineIdx = 0;
  while (testcases.length < numOfTestcase) {
    let [cntVertices, cntEdges] = input[++curLineIdx].split(" ").map(Number);

    const graph = Array.from({ length: cntVertices + 1 }, () => []);
    for (let i = 0; i < cntEdges; i++) {
      const [v1, v2] = input[++curLineIdx].split(" ").map((v) => +v);
      graph[v1].push(v2);
      graph[v2].push(v1);
    }

    testcases.push({
      cntVertices,
      graph,
    });
  }
})();

// Object.values(testcases).map(({ graph }) =>
//   console.log(
//     graph.reduce(
//       (prev, cur, idx) => prev + `\n[${idx}] ${cur.map((v) => v)}`,
//       ""
//     )
//   )
// );

function isBipartiteGraph({ N, graph, startVertex }) {
  // const result = [];
  const visited = Array(N + 1).fill(false);
  const checked = Array(N + 1).fill(-1); // 0: Group1, 1: Group2
  let verticesToVisit = [startVertex]; // queue
  let curVertex = startVertex;
  checked[startVertex] = 0;

  // dfsLoop
  while (verticesToVisit.length > 0) {
    [curVertex, ...verticesToVisit] = verticesToVisit;

    if (visited[curVertex]) continue;
    visited[curVertex] = true;

    const curGroup = checked[curVertex];
    for (let vertex of graph[curVertex]) {
      if (checked[vertex] === curGroup) return "NO";
      checked[vertex] = +!curGroup;
    }
    // result.push(curVertex); // result = [...result, curVertex];

    verticesToVisit = [...graph[curVertex], ...verticesToVisit];
  }

  // console.log(result);
  return "YES";
}

// main
const result = testcases.map(({ cntVertices, graph }) =>
  isBipartiteGraph({ N: cntVertices, graph, startVertex: 1 })
);
console.log(result.join("\n"));
