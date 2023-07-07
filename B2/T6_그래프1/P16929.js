// https://www.acmicpc.net/problem/16929
// Two Dots
// 골드 4

// 문제를 잘못 이해핬다.
// 꼭 네모가 아니라 선이아닌 도형으로 이루어지기만 하는 것을 확인하는 것이 였다...
// 문제를 잘 읽어봐야겠다...

const NOT_VISIT = 0;
const VISIT = 1;

const MOVE_POINTS = [
  [[0, 1], 0],
  [[1, 0], 1],
  [[0, -1], 2],
  [[-1, 0], 3],
];

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();
const input = inputString.trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);
const board = Array.from({ length: H }).map((_, i) => input[i + 1].split(""));
// console.log(board);
run();

function run() {
  for (let i = 0; i < H; i++) {
    for (let j = 0; j < W; j++) {
      // console.log("######## [", i, j, "]", board[i][j]);
      if (checkCycle({ startI: i, startJ: j })) {
        console.log("Yes");
        return;
      }
    }
  }
  console.log("No");
}

function checkCycle({ startI, startJ }) {
  const type = board[startI][startJ];
  const visited = Array.from({ length: H }).map((_) =>
    Array(W).fill(NOT_VISIT)
  );

  let [curI, curJ, curDir] = [startI, startJ, -1];
  let pointsToCheck = [[[curI, curJ], -1]];
  let cntMove = 0;

  while (pointsToCheck.length > 0) {
    [[[curI, curJ], curDir], ...pointsToCheck] = pointsToCheck;
    if (visited[curI][curJ] === VISIT) {
      // console.log(" V [", curI, curJ, "]");
      if (curI === startI && curJ === startJ && cntMove >= 4) return true;
      continue;
    }

    visited[curI][curJ] = VISIT;
    if (board[curI][curJ] !== type) continue;
    if (curI < startI) continue;

    cntMove += 1;

    const addPoints = makeNextPoints(curI, curJ, curDir);
    pointsToCheck = [...addPoints, ...pointsToCheck];

    // console.log(
    //   " - [",
    //   curI,
    //   curJ,
    //   "]",
    //   curDir,
    //   board[curI][curJ],
    //   board[curI][curJ] === type,
    //   addPoints
    // );
  }
  return false;
}

function makeNextPoints(i, j, dir) {
  let exceptDir = getExceptDir(dir);

  return MOVE_POINTS.map(([[mi, mj], d]) => [[i + mi, j + mj], d]).filter(
    ([[i, j], d]) => i >= 0 && i < H && j >= 0 && j < W && d !== exceptDir
  );
}

// 온 방향으로 되돌아가지 않기 위함
function getExceptDir(dir) {
  switch (dir) {
    case 0:
      return 2;
    case 1:
      return 3;
    case 2:
      return 0;
    case 3:
      return 1;
    default:
      return -1;
  }
}

// 추가 예제
// 3 3
// ABA
// ABA
// AAA
