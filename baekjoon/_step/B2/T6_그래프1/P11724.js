// https://www.acmicpc.net/problem/11724
// 연결 요소의 개수
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";
const inputString = fs.readFileSync(filePath).toString();
// const inputString = `6 5
// 1 2
// 2 5
// 5 1
// 3 4
// 4 6`; // => 2

const input = inputString.trim().split("\n");
const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= M; i++) {
  const [v1, v2] = input[i].split(" ").map((v) => +v);
  graph[v1].push(v2);
  graph[v2].push(v1);
}

function dfsRecursive({ N, graph }) {
  const visited = [true].concat(Array(N).fill(false));
  let numOfConnectedComponents = 0;

  function dfs(curVertex) {
    if (visited[curVertex]) return;
    visited[curVertex] = true;
    graph[curVertex].forEach((v) => dfs(v));
  }

  while ((startVertex = visited.findIndex((v) => v === false)) !== -1) {
    dfs(startVertex);
    numOfConnectedComponents++;
  }

  return numOfConnectedComponents;
}

console.log(dfsRecursive({ N, graph }));
