// https://www.acmicpc.net/problem/20366
// 같이 눈사람 만들래?
// 골드 3
// 투 포인터, 완전 탐색
// 231103
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
//  N (4 ≤ N ≤ 600)
// 각 눈덩이(N개)의 지름 (1 ≤ Hi ≤ 10^9)
// 4개의 눈덩이를 골라서 만들 수 있는 두 눈사람의 가장 작은 키 차이 구하기
// ---------------------------------------
function findMinHeightDifferenceBetweenTwoSnowMen(lenOfList, list) {
  // console.log(list);

  let min = list.at(-1);

  for (let p1Left = 0; p1Left < lenOfList - 3; p1Left += 1) {
    for (let p1Right = p1Left + 3; p1Right < lenOfList; p1Right += 1) {
      const h1 = list[p1Left] + list[p1Right];
      // console.log(`> ${p1Left} ${p1Right}`);

      let p2Left = p1Left + 1;
      let p2Right = p1Right - 1;

      while (p2Left < p2Right) {
        const h2 = list[p2Left] + list[p2Right];
        const diff = h1 - h2;
        // console.log(`>> ${p2Left} ${p2Right}`, diff);
        min = Math.min(min, Math.abs(diff));

        if (diff > 0) {
          // h1이 더 큼
          p2Left += 1;
        } else if (diff < 0) {
          // h2가 더 큼
          p2Right -= 1;
        } else {
          return min;
        }
      }
    }
  }
  return min;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 1
      "./input2.txt", // 0
      "./input3.txt", // 0
      "./input4.txt", // 0
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, list] = inputString.trim().split("\n");

  console.log(
    findMinHeightDifferenceBetweenTwoSnowMen(
      +info,
      list
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b)
    )
  );
}
