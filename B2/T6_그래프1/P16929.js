// https://www.acmicpc.net/problem/16929
// Two Dots
// 골드 4

// 그래프 탐색 문제라는 걸 알고 있었지만,
// DFS, BFS가 아닌 다른 방식으로 풀 수 있는지 궁금했다.
// 실패 !

const MODE = {
  DOWN: 0,
  RIGHT: 1,
};

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();
const input = inputString.trim().split("\n");

const [H, W] = input[0].split(" ").map(Number);
const board = Array.from({ length: H }).map((_, i) => input[i + 1].split(""));
// console.log(board);
run();

function run() {
  for (let i = 0; i < H - 1; i++) {
    for (let j = 0; j < W - 1; j++) {
      if (check({ startI: i, startJ: j })) {
        console.log("YES");
        return;
      }
    }
  }
  console.log("NO");
}

function check({ startI, startJ }) {
  // console.log("####", startI, startJ, "-----");
  let type = board[startI][startJ];

  let curI = startI;
  let curJ = startJ + 1;

  let targetI = curI;
  let targetJ = curJ;

  let mode = MODE.DOWN; // 0: down, 1:right

  while (curI < H && curJ < W) {
    // console.log("[", mode === 0 ? "D" : "R", "]", curI, curJ);

    if (board[curI][curJ] === type) {
      if (curI === 0) {
        mode = MODE.DOWN;
        curI += 1;
        continue;
      } else if (curJ === 0) {
        mode = MODE.RIGHT;
        curJ += 1;
        continue;
      }

      if (mode === MODE.DOWN) {
        if (curI < targetI) {
          curI += 1;
        } else {
          // curI === targetI
          mode = MODE.RIGHT;
          curI = targetI = curI + 1;
          curJ = 0;
        }
      } else {
        // mode === MODE.RIGHT
        if (curJ < targetJ) {
          curJ += 1;
        } else {
          // curJ === targetJ
          return true;
        }
      }
    } else {
      if (curI === 0 || curJ === 0) return false;

      if (mode === MODE.DOWN) {
        curI = 0;
        curJ += 1;
        targetJ = curJ;
      } else {
        // mode === MODE.RIGHT
        if (curJ === targetJ) {
          mode = MODE.DOWN;
          curI = targetI = curI + 1;
          curJ = targetJ = curJ + 1;
        } else {
          // curJ < targetJ
          curJ = 0;
          curI += 1;
          targetI = curI;
        }
      }
    }
  }
  return false;
}
