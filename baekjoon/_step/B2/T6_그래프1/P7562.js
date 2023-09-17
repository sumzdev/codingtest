// https://www.acmicpc.net/problem/7562
// 나이트의 이동
// 실버 1

const NOT_VISIT = 0;

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();
const input = inputString.trim().split("\n");

let testcase = +input[0];
let inputIdx = 1;
while (testcase--) {
  const size = +input[inputIdx++];
  const [startI, startJ] = input[inputIdx++].split(" ").map(Number);
  const [targetI, targetJ] = input[inputIdx++].split(" ").map(Number);

  const moves = getShortestMoves({ size, startI, startJ, targetI, targetJ });
  console.log(moves);
}

function getShortestMoves({ size, startI, startJ, targetI, targetJ }) {
  const visited = Array.from({ length: size }).map((_) =>
    Array(size).fill(NOT_VISIT)
  );

  let cntMove = 0;
  let verticesToVisit = [[startI, startJ]];

  while (verticesToVisit.length > 0) {
    let verticesToAdd = [];

    for (let [curI, curJ] of verticesToVisit) {
      if (curI === targetI && curJ === targetJ) {
        return cntMove;
      }
      const points = createMovablePoints(curI, curJ, size);

      for (let [nextI, nextJ] of points) {
        if (visited[nextI][nextJ] !== 0) continue;
        visited[nextI][nextJ] = cntMove + 1;
        verticesToAdd.push([nextI, nextJ]);
      }
    }
    verticesToVisit = [...verticesToAdd];
    cntMove += 1;
  }
}

function createMovablePoints(i, j, w) {
  const MOVE_POINTS = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
  ];

  return MOVE_POINTS.map(([mi, mj]) => [i + mi, j + mj]).filter(
    ([i, j]) => i >= 0 && i < w && j >= 0 && j < w
  );
}
