// https://www.acmicpc.net/problem/7576
// 토마토
// 골드 5

// 메모리초과
// max 값 계산해줄 필요 없이 day 계산으로 구할 수 있음
// checkFlag를 두어서 해당 일에 익은 토마토 없으면 반복문 종료

const NOT_VISIT = 9000001;
const EMPTY = 9000000;

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
  console.log(1);
  return;
}

findFastestDays({ height, width, map: box });

function findFastestDays({ width, height, map }) {
  const check = Array.from({ length: height }).map((_) =>
    Array(width).fill(NOT_VISIT)
  );

  // 익어있는 토마토 목록
  const locationOfRipeTomatoes = [];
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      if (map[i][j] === 1) {
        locationOfRipeTomatoes.push([i, j]);
        check[i][j] = 1;
      } else if (map[i][j] === -1) {
        check[i][j] = EMPTY;
      }
    }
  }
  // console.log(locationOfRipeTomatoes, check);

  // 익은 토마토 위치들 주변 위치들 verticesToVisit에 넣어서 초기화
  let verticesToVisit = locationOfRipeTomatoes.map(
    ([curRowIdx, curColumnIdx]) => [
      ...createMovablePoints({
        height,
        width,
        curRowIdx,
        curColumnIdx,
      }),
    ]
  );
  verticesToVisit = verticesToVisit.flat();
  // console.log(verticesToVisit);

  let curI = 0;
  let curJ = 0;

  while (verticesToVisit.length > 0) {
    [[curI, curJ], ...verticesToVisit] = verticesToVisit;
    // console.log("cur", [curI, curJ]);

    if (check[curI][curJ] !== NOT_VISIT) continue;
    if (map[curI][curJ] === -1) {
      check[curI][curJ] = EMPTY;
      continue;
    }

    const points = createMovablePoints({
      height,
      width,
      curRowIdx: curI,
      curColumnIdx: curJ,
    });

    const values = points
      .map(([i, j]) => check[i][j])
      .filter((v) => v !== NOT_VISIT && v !== EMPTY);
    // console.log(verticesToVisit);
    // console.log(values);
    // console.log(check);
    const min = Math.min(...values);

    check[curI][curJ] = min + 1;
    verticesToVisit = [
      ...verticesToVisit,
      // ...points
      ...points.filter(([i, j]) => map[i][j] !== -1),
    ];
  }

  // console.log(check);

  const max = Math.max(...check.flat().filter((v) => v !== EMPTY));
  if (max === NOT_VISIT) {
    /** 갈 수 없는 곳이 존재하는 경우 처리하기 위함
     * 6 4
0 -1 0 0 0 0
-1 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 1
     */
    console.log(-1);
    return;
  }
  console.log(max - 1);
}

function createMovablePoints({
  height: h,
  width: w,
  curRowIdx: i, // h
  curColumnIdx: j, // w
}) {
  const MOVE_POINTS = [
    // [-1, -1],
    [-1, 0],
    // [-1, 1],
    [0, -1],
    [0, 1],
    // [1, -1],
    [1, 0],
    // [1, 1],
  ];

  return MOVE_POINTS.map(([mi, mj]) => [i + mi, j + mj]).filter(
    ([i, j]) => i >= 0 && i < h && j >= 0 && j < w
  );
}
