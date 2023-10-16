// https://www.acmicpc.net/problem/2580
// 스도쿠
// 골드4
// 백트래킹
// 231016

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function getBlankList(board) {
  const blankCellList = [];
  for (let row = 0; row < 9; row += 1) {
    for (let col = 0; col < 9; col += 1) {
      if (board[row][col] === 0) blankCellList.push([row, col]);
    }
  }
  return blankCellList;
}

// 시도 1 : 시간 초과
// function getBlockIndexListToCheck(rowIdx, colIdx) {
//   // 세로 줄 인덱스 목록
//   const horizontalList = Array.from({ length: 9 }).map((_, i) => [rowIdx, i]);
//   // 가로 줄 인덱스 목록
//   const verticalList = Array.from({ length: 9 }).map((_, i) => [i, colIdx]);

//   // 3x3 블록
//   const rowBlock = Math.floor(rowIdx / 3) * 3;
//   const colBlock = Math.floor(colIdx / 3) * 3;
//   const block3x3List = Array.from({ length: 3 }).map((_, r) =>
//     Array.from({ length: 3 }).map((__, c) => [r + rowBlock, c + colBlock])
//   );

//   return [horizontalList, verticalList, block3x3List.flat()];
// }

// function checkCellIsCorrect(board, rowIdx, colIdx, value) {
//   for (const blockIndexListToCheck of getBlockIndexListToCheck(
//     rowIdx,
//     colIdx
//   )) {
//     for (const [rIdx, cIdx] of blockIndexListToCheck) {
//       if (board[rIdx][cIdx] === value) return false;
//     }
//   }
//   return true;
// }

// 시도 2
function checkCellIsCorrect(board, rowIdx, colIdx, value) {
  for (let i = 0; i < 9; i += 1) {
    if (board[rowIdx][i] === value) return false;
    if (board[i][colIdx] === value) return false;
  }

  const rowBlock = Math.floor(rowIdx / 3) * 3;
  const colBlock = Math.floor(colIdx / 3) * 3;
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      if (board[i + rowBlock][j + colBlock] === value) return false;
    }
  }
  return true;
}

function getAnswerSudokuGame(board) {
  // const board = [...gameBoard.map((v) => [...v])];
  // console.log(answerBoard);

  const blankCellList = getBlankList(board);
  // console.log(blankCellList);

  let flag = false;

  const backtracking = (curBlankCelIdx) => {
    if (curBlankCelIdx === blankCellList.length) {
      flag = true;
      return;
    }

    const [blankRowIdx, blankColIdx] = blankCellList[curBlankCelIdx];

    for (let n = 1; n <= 9; n += 1) {
      if (checkCellIsCorrect(board, blankRowIdx, blankColIdx, n)) {
        board[blankRowIdx][blankColIdx] = n;
        backtracking(curBlankCelIdx + 1);
        if (flag) return;
        board[blankRowIdx][blankColIdx] = 0;
      }
    }
  };
  backtracking(0);

  return board.map((row) => row.join(" ")).join("\n");
}

// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const board = inputString
    .trim()
    .split("\n")
    .map((row) => row.split(" ").map(Number));
  console.log(getAnswerSudokuGame(board).trim());
}
