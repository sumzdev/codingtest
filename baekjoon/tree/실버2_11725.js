// https://www.acmicpc.net/problem/11725
// 트리의 부모 찾기
// 실버 2

/**
 * 시간 초과 해결 방법
 *  - 입력 처리 변경 (시간 초과)
  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
 * 
 *  - 출력 : console.log(check.slice(2).join("\n"));
 */

const fs = require("fs");

const inputString = fs.readFileSync("/dev/stdin").toString();
const input = inputString.trim().split("\n");
run(input);

function run(input) {
  const N = +input[0];
  const graph = { ...Array.from({ length: N + 1 }).map((_) => []) };
  for (let i = 1; i < input.length; i++) {
    const [a, b] = input[i].split(" ").map((v) => +v);
    graph[a] = [...graph[a], b];
    graph[b] = [...graph[b], a];
  }
  // console.log(graph);

  let check = Array.from({ length: N + 1 }).fill(0);
  check[0] = -1;

  const dfsLoop = ({ curVertex, parentVertex }) => {
    // console.log(curVertex, parentVertex);
    if (check[curVertex] !== 0) return;
    check[curVertex] = parentVertex;
    graph[curVertex].forEach((vertex) =>
      dfsLoop({ curVertex: vertex, parentVertex: curVertex })
    );
  };
  dfsLoop({ curVertex: 1, parentVertex: -1 });

  // console.log(check);
  console.log(check.slice(2).join("\n"));
}
