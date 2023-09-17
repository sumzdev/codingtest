// https://www.acmicpc.net/problem/13023
// ABCDE
// 골드 5

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let check = new Array(N).fill(0);

let graph = new Array(N).fill(0).map((_) => []);
for (let i = 1; i <= M; i++) {
  let [v1, v2] = input[i].split(" ").map(Number);
  graph[v1].push(v2);
  graph[v2].push(v1);
}
// console.log(graph);

let res = 0;
let stack = [];
for (let vIdx = 0; vIdx < N; vIdx++) {
  // stack.push(vIdx);
  if (res) break;
  // console.log("###start ", vIdx);
  dfs(vIdx, 1);
  // stack.pop();
}
console.log(res);

function dfs(curIdx, deps) {
  check[curIdx] = 1;
  // console.log("dep:", deps, "cur:", curIdx, ...check, stack, graph[curIdx]);
  if (res) return;
  if (deps === 5) {
    res = 1;
    // console.log(stack);
    return;
  }

  for (let vertex of graph[curIdx]) {
    if (!check[vertex]) {
      // stack.push(vertex);
      dfs(vertex, deps + 1);
      // stack.pop();
    }
  }

  check[curIdx] = 0;
}
