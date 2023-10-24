// https://www.acmicpc.net/problem/11403
// 경로 찾기
// 실버 1
// 최단경로, 플로이드-워셜
// 231024

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
const INF = Number.MAX_SAFE_INTEGER;

/**
 * 플로이드 워셜(Floyd Warshall) - 모든 노드 간의 최단 거리 구하기
 *
 * @param {number} N 노드 개수
 * @param {(0|1)[][]} edgeList 간선 정보 목록 (간선 있으면 1, 없으면 0)
 * - i 노드에서 j 노드 방향 간선 있으면 1 (edgeList[i][j] = 1)
 * - size : [N][N]
 */
function floydWarshall(N, edgeList) {
  const listOfCanGo = [...edgeList.map((v) => [...v])];

  for (let k = 0; k < N; k += 1) {
    for (let i = 0; i < N; i += 1) {
      for (let j = 0; j < N; j += 1) {
        if (i === k || j === k) continue;
        if (!listOfCanGo[i][j] && listOfCanGo[i][k] && listOfCanGo[k][j]) {
          listOfCanGo[i][j] = 1;
        }
      }
    }
  }

  return listOfCanGo
    .map((v) => v.join(" "))
    .join("\n")
    .trim();
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...numberList] = inputString.trim().split("\n");

  console.log(
    floydWarshall(
      +N,
      numberList.map((v) => v.split(" ").map(Number))
    )
  );
}
