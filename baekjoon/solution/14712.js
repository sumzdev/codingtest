// https://www.acmicpc.net/problem/14712
// 골드 5
// 넴모넴모 (Easy)
// 230930

// ---------------------------------------

const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", // 15
      "./input2.txt", // 57
      "./input3.txt", // 22077
    ];

let board;
let N, M;

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  // const input = inputString.trim().split("\n");

  [N, M] = inputString.split(" ").map(Number);

  board = Array.from({ length: N }).map((_) =>
    Array.from({ length: M }).map((v) => 1)
  );

  const total = nemo(0, 0, false);
  // console.log("[res]", N, M, total, 2 ** (N * M) - total);

  console.log(2 ** (N * M) - total);
  // 전체 경우의 수(2^칸수)에 - 사각형 이루는 경우의 수
  // = 2x2 사각형 이루지 않는 경우의수
}

/**
 * “넴모”가 올라간 칸 네 개가 2 × 2 사각형을 이루는 경우의 수 구하기
 *
 * @param {*} i
 * @param {*} j
 * @param {*} hasNemo : 앞에서 이미 2x2 사각형 이룬 경우
 */
function nemo(i, j, hasNemo) {
  let cnt = 0;
  if (i === N) {
    // console.log(
    //   board.map((row) => row.map((v) => (v ? "O" : "X")).join("")).join("\n"),
    //   `--${i}-${j}-${hasNemo}\n`
    // );
    return hasNemo ? 1 : 0;
  }

  let nextI = i;
  let nextJ = j + 1;
  if (nextJ === M) {
    nextI += 1;
    nextJ = 0;
  }

  board[i][j] = 1;
  const isNemo =
    hasNemo ||
    (i > 0 && board[i - 1][j - 1] && board[i - 1][j] && board[i][j - 1]);
  cnt += nemo(nextI, nextJ, !!isNemo);
  board[i][j] = 0;

  cnt += nemo(nextI, nextJ, !!hasNemo);
  return cnt;
}
// ---------------------------------------
