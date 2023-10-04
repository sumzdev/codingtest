// https://www.acmicpc.net/problem/17829
// 222-풀링
// 실버 2
// 분할 정복
// 231004

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

function print(poolingData) {
  for (let i = 0; i < poolingData.length; i++) {
    console.log(...poolingData[i]);
  }
}

function getLast222Pooling(board) {
  // console.log(board);
  const poolingData = [...board.map((row) => [...row])];

  const N = board.length;
  let gap = 1;
  while (gap < N) {
    // console.log("=========", gap);
    for (let cursorI = 0; cursorI < N; cursorI += gap << 1) {
      for (let cursorJ = 0; cursorJ < N; cursorJ += gap << 1) {
        let twotwo = [
          poolingData[cursorI][cursorJ],
          poolingData[cursorI + gap][cursorJ],
          poolingData[cursorI][cursorJ + gap],
          poolingData[cursorI + gap][cursorJ + gap],
        ];
        // console.log(cursorI, cursorJ, twotwo);
        twotwo.sort((a, b) => b - a);
        poolingData[cursorI][cursorJ] = twotwo[1];
        // console.log(twotwo, "=>", twotwo[1]);
      }
    }
    // print(poolingData);
    gap = gap << 1;
  }

  return poolingData[0][0];
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 11
      "./input2.txt", // 17
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  let [N, ...input] = inputString.trim().split("\n");
  N = +N;
  input = input.map((v) => v.split(" ").map(Number));

  const result = getLast222Pooling(input);
  console.log(result);
}
