// https://www.acmicpc.net/problem/13549
// 숨바꼭질 3
// 골드 5
// BFS
// 231118
// ---------------------------------------
function bfs(num, target) {
  const MAX = 100000;

  const checked = Array(MAX + 1).fill(MAX);
  const visited = Array(MAX + 1).fill(false);
  let pointsToVisit = [num];

  checked[num] = 0;

  while (pointsToVisit.length) {
    const nextPointsToVisit = [];

    for (const idx of pointsToVisit) {
      if (visited[idx]) continue;
      visited[idx] = true;
      if (idx === target) return checked[target];

      // console.log(idx, checked[idx], idx << 1, idx - 1, idx + 1);
      // if (idx << 1 === target) return checked[idx];
      // if (idx - 1 === target || idx + 1 === target) return checked[idx] + 1;

      // ---- 다음 같은 depth의 방문할 노드들 추가 -------
      // ---- 주어진 조건에 따라 visited 여부에 따라 추가하지 않기
      // ----주어진 조건에 따라 테이블 값 설정 -----------
      // 1) n * 2
      if (idx << 1 <= MAX && checked[idx] < checked[idx << 1]) {
        checked[idx << 1] = checked[idx];
        nextPointsToVisit.unshift(idx << 1);
      }
      // 2) n - 1
      if (idx - 1 >= 0 && checked[idx] + 1 < checked[idx - 1]) {
        checked[idx - 1] = checked[idx] + 1;
        nextPointsToVisit.push(idx - 1);
      }
      // 3) n + 1
      if (idx + 1 <= MAX && checked[idx] + 1 < checked[idx + 1]) {
        checked[idx + 1] = checked[idx] + 1;
        nextPointsToVisit.push(idx + 1);
      }
    }

    pointsToVisit = nextPointsToVisit;
    // console.log(nextPointsToVisit);
  }

  return checked[target];
}

// ---------------------------------------
const fs = require("fs");
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
  const input = fs.readFileSync(filePath);
  // const [size, ...inputLine] = input.toString().trim().split("\n");
  const [num, target] = input.toString().trim().split(" ").map(Number);

  console.log(bfs(num, target));
}
