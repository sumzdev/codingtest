// https://www.acmicpc.net/problem/2447
// 별 찍기 - 10
// 골드 5
// 분할 정복
// 231005
// ---------------------------------------
// ex) N = 27
// step | gap | M   |칠할 포인트의 중심점(i)| 한 포인트당 칠해야하는 index 목록
// 1    | 3   | 1   | M ... N (+gap)   | i
// 3    | 9   | 4   | M ... N (+gap)   | i-1 ~ i+1
// 9    | 27  | 13  | M ... N (+gap)   | i-4 ~ i+4

// ---------------------------------------
// 더 좋은 답안 : https://www.acmicpc.net/source/64514587
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function makeStar(N) {
  const star = Array.from({ length: N }).map((v) =>
    Array.from({ length: N }).fill("*")
  );

  let prevGapIdx = 0;
  for (let step = 1; step < N; step *= 3) {
    const gap = step * 3;
    const startM = gap >> 1;
    // console.log(step, gap, startM);

    for (let i = startM; i < N; i += gap) {
      for (let j = startM; j < N; j += gap) {
        for (let fI = i - prevGapIdx; fI <= i + prevGapIdx; fI += 1) {
          for (let fJ = j - prevGapIdx; fJ <= j + prevGapIdx; fJ += 1) {
            star[fI][fJ] = " ";
          }
        }
      }
    }
    // console.log(star.map((v) => v.join("")).join("\n"));
    prevGapIdx = startM;
  }

  return star.map((v) => v.join("")).join("\n");
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const N = +inputString.trim();
  console.log(makeStar(N).trim());
}
