// https://www.acmicpc.net/problem/16929
// Two Dots
// 골드 4

// 문제를 잘못 이해핬다.
// ㅁ가 아니라 그냥 연결했을 때 선이아닌 도형으로 이루어지기만 하는 것을 확인하는 것이 였다...
// 문제를 잘 읽어봐야겠다...

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
        console.log("Yes");
        return;
      }
    }
  }
  console.log("No");
}

function check({ startI, startJ }) {
  let type = board[startI][startJ];
  // console.log("####", startI, startJ, "-----", type);

  let curI = startI;
  let curJ = startJ + 1;

  let targetI = curI + 1;
  let targetJ = curJ;

  let mode = MODE.DOWN; // 0: down, 1:right

  while (curI < H && curJ < W) {
    // console.log(
    //   "[",
    //   mode === 0 ? "D" : "R",
    //   "]",
    //   curI,
    //   curJ,
    //   board[curI][curJ],
    //   board[curI][curJ] === type
    // );

    if (board[curI][curJ] === type) {
      if (mode === MODE.DOWN) {
        if (curI < targetI - 1) {
          curI += 1;
        } else {
          // curI === targetI
          mode = MODE.RIGHT;
          curI = targetI;
          curJ = startJ;
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
      if (curI === startI || curJ === startJ) return false;

      if (mode === MODE.DOWN) {
        curI = 0;
        curJ += 1;
        targetJ = curJ;
      } else {
        // mode === MODE.RIGHT
        if (curJ === targetJ) {
          mode = MODE.DOWN;
          targetI = curI + 1;
          curJ = targetJ = curJ + 1;
          curI = startI;
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
