// https://www.acmicpc.net/problem/1260
// DFS와 BFS
// 실버 2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M, startV] = input[0].split(" ").map(Number);

let graph = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i <= M; i++) {
  let [v1, v2] = input[i].split(" ").map(Number);
  graph[v1].push(v2);
  graph[v2].push(v1);
}

// DFS
Object.keys(graph).map((v) => (graph[v] = graph[v].sort((a, b) => b - a)));
// console.log(graph);
let dfsRes = dfs(startV);
console.log(dfsRes.join(" "));

// BFS
Object.keys(graph).map((v) => (graph[v] = graph[v].sort((a, b) => a - b)));
// console.log(graph);
let bfsRes = bfs(startV);
console.log(bfsRes.join(" "));

function dfs(startVertex) {
  let check = new Array(N).fill(0);
  let stack = [startVertex];
  let visited = [];

  while (stack.length !== 0) {
    let vertex = stack.pop();
    if (check[vertex - 1]) {
      continue;
    }
    check[vertex - 1] = 1;
    visited.push(vertex);
    stack.push(...graph[vertex]);
  }
  return visited;
}

function bfs(startVertex) {
  let check = new Array(N).fill(0);
  let queue = [startVertex];
  let visited = [];

  while (queue.length !== 0) {
    let vertex = queue.shift();
    if (check[vertex - 1]) {
      continue;
    }
    check[vertex - 1] = 1;
    visited.push(vertex);
    queue.push(...graph[vertex]);
  }
  return visited;
}
