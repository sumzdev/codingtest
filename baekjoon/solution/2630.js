// https://www.acmicpc.net/problem/2630
// 색종이 만들기
// 실버 2
// 분할 정복
// 231004

// ---------------------------------------
// 시도 1 - problems 배열로 관리 - 메모리 초과
// 시도 2 - 재귀 호출 방식
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function print(board, startI, startJ, size) {
  console.log("check", startI, startJ, size);

  for (let i = startI; i < startI + size; i += 1) {
    let tmp = "";
    for (let j = startJ; j < startJ + size; j += 1) {
      tmp += board[i][j] + " ";
    }
    console.log(tmp);
  }
}

function getNumOfSquare(board) {
  // console.log(board);
  const N = board.length;
  const cnt = { 1: 0, 0: 0 }; // 1: blue, 0:white

  // 시도 1 - problems 배열로 관리 - 메모리 초과
  // let startI, startJ, size;
  // let problems = [[0, 0, N]];
  // [startI, startJ, size][]

  // while (problems.length > 0) {
  const divide = (startI, startJ, size) => {
    // [[startI, startJ, size], ...problems] = problems;
    // print(board, startI, startJ, size);

    let [cursorI, cursorJ] = [startI, startJ];
    let check = false;
    const color = board[cursorI][cursorJ];

    while (board[cursorI][cursorJ] === color) {
      cursorJ += 1;
      if (cursorJ === startJ + size) {
        cursorJ = startJ;
        cursorI += 1;
      }
      if (cursorI === startI + size) {
        check = true;
        break;
      }
    }

    if (!check) {
      // divide
      const dividedSize = size >> 1;
      // const dividedProblems = [
      //   [startI, startJ, dividedSize],
      //   [startI + dividedSize, startJ, dividedSize],
      //   [startI, startJ + dividedSize, dividedSize],
      //   [startI + dividedSize, startJ + dividedSize, dividedSize],
      // ];

      // problems.push(...dividedProblems);

      divide(startI, startJ, dividedSize);
      divide(startI + dividedSize, startJ, dividedSize);
      divide(startI, startJ + dividedSize, dividedSize);
      divide(startI + dividedSize, startJ + dividedSize, dividedSize);
    } else {
      cnt[color] += 1;
    }
    // console.log(startI, startJ, size, check);
  };

  // 시도 2 - 재귀 호출
  divide(0, 0, N);

  return `${cnt[0]}\n${cnt[1]}`;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  let [N, ...input] = inputString.trim().split("\n");
  N = +N;
  input = input.map((v) => v.split(" ").map(Number));

  const result = getNumOfSquare(input);
  console.log(result);
}
