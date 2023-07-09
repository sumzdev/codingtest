// https://www.acmicpc.net/problem/7576
// 토마토
// 골드 5

// 메모리초과 -- 해결
// max 값 계산해줄 필요 없이 day 계산으로 구할 수 있음
// checkFlag를 두어서 해당 일에 익은 토마토 없으면 반복문 종료

const NOT_VISIT = 0;
const EMPTY = -1;

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
const inputString = fs.readFileSync(filePath).toString();
const input = inputString.trim().split("\n");

const [width, height] = input[0].split(" ").map(Number);
const box = Array(height)
  .fill([])
  .map((_, i) => input[i + 1].split(" ").map(Number));
// console.log(box);

if (!box.flat().includes(1)) {
  // 익은 토마토가 없음
  console.log(-1);
  return;
} else if (!box.flat().includes(0)) {
  // 익을 토마토가 없음 & 이미 다익음
  console.log(0);
  return;
}

findFastestDays({ height, width, map: box });

function findFastestDays({ width, height, map }) {
  const check = Array.from({ length: height }).map((_) =>
    Array(width).fill(NOT_VISIT)
  );

  let verticesToVisit = [];
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      if (map[i][j] === 1) {
        verticesToVisit.push([i, j]);
        check[i][j] = 1;
      } else if (map[i][j] === -1) {
        check[i][j] = EMPTY;
      }
    }
  }
  // console.log(verticesToVisit);

  let day = 1;

  let checkFlag = false;
  while (verticesToVisit.length > 0) {
    // console.log(`[[${day}]] `, verticesToVisit);
    let verticesToAdd = [];
    checkFlag = false;

    for (let [curI, curJ] of verticesToVisit) {
      const points = createMovablePoints({
        height,
        width,
        curRowIdx: curI,
        curColumnIdx: curJ,
      });

      for (let [nextI, nextJ] of points) {
        if (check[nextI][nextJ] !== 0) continue;
        checkFlag = true;
        check[nextI][nextJ] = day + 1;
        verticesToAdd.push([nextI, nextJ]);
      }
    }
    // console.log(`[${day}] `, checkFlag, "check----", check);
    if (!checkFlag) break;
    verticesToVisit = [...verticesToAdd];
    day += 1;
  }

  if (check.map((row) => row.filter((v) => v == 0)).flat().length) {
    console.log(-1);
    return;
  }
  console.log(day - 1);
}

function createMovablePoints({
  height: h,
  width: w,
  curRowIdx: i, // h
  curColumnIdx: j, // w
}) {
  const MOVE_POINTS = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  return MOVE_POINTS.map(([mi, mj]) => [i + mi, j + mj]).filter(
    ([i, j]) => i >= 0 && i < h && j >= 0 && j < w
  );
}
