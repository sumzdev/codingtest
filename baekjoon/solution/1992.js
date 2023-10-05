// https://www.acmicpc.net/problem/1992
// 쿼드트리
// 실버 1
// 분할 정복
// 231005
// ---------------------------------------
// 시도 1 - 전체를 확인후 다른 숫자가 있는 경우 분할
// 시도 2 - 분할된 점부터 확인하고 합치기
// ---------------------------------------
// 추가 테스트 케이스
// 4
// 1010
// 1010
// 1010
// 1010

// ((1010)(1010)(1010)(1010))
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

function getDividedIndex(i, j, gap) {
  return [
    [i, j],
    [i, j + gap],
    [i + gap, j],
    [i + gap, j + gap],
  ];
}

function makeQuadTree(N, video) {
  // console.log(N, video);
  for (let size = 2; size <= N; size = size << 1) {
    // console.log("###", size);
    for (let cursorI = 0; cursorI < N; cursorI += size) {
      for (let curosrJ = 0; curosrJ < N; curosrJ += size) {
        // console.log(">>", cursorI, curosrJ);

        let isSame = true;
        const pointList = getDividedIndex(cursorI, curosrJ, size >> 1);
        // console.log(pointList);

        const firstPointData = video[pointList[0][0]][pointList[0][1]];
        const conquerData = pointList.map(([i, j]) => {
          if (firstPointData !== video[i][j] || video[i][j].length !== 1) {
            isSame = false;
          }
          return video[i][j];
        });
        // console.log(conquerData.join(" "));

        video[cursorI][curosrJ] = isSame
          ? firstPointData
          : "(" + conquerData.join("") + ")";
      }
    }
  }
  return video[0][0];
}

// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", // (0111)
      // "./input2.txt", // (0(0011)(0(0111)01)1)
      // "./input3.txt", // ((110(0101))(0010)1(0001))
      // "./input4.txt", // 1
      "./input5.txt", // 1
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");

  const quadTree = makeQuadTree(
    +N,
    input.map((v) => v.split(""))
  );
  console.log(quadTree);
}
