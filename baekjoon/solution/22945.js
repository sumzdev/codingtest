// https://www.acmicpc.net/problem/22945
// 팀 빌딩
// 골드 4
// 투 포인터
// 231102
// ---------------------------------------
// 2 ≤ N ≤ 100,000
// 1 ≤ x_i ≤ 10,000
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 시도1 : 시간초과
// function maxTeamScore(scoreList) {
//   let maxScore = 0;

//   for (let left = 0; left < scoreList.length - 2; left += 1) {
//     let len = scoreList.length - left - 2;
//     for (let right = scoreList.length - 1; right > left + 1; right -= 1) {
//       maxScore = Math.max(
//         maxScore,
//         len * Math.min(scoreList[left], scoreList[right])
//       );
//       len -= 1;
//     }
//   }
//   return maxScore;
// }
// ---------------------------------------
function maxTeamScore(scoreList) {
  let maxScore = 0;

  let left = 0;
  let right = scoreList.length - 1;
  let len = scoreList.length - 2;

  while (len >= 1) {
    const score = len * Math.min(scoreList[left], scoreList[right]);
    maxScore = Math.max(maxScore, score);

    if (scoreList[left] < scoreList[right]) {
      const prevLeft = scoreList[left];
      len -= 1;
      while (scoreList[++left] <= prevLeft) {
        if (len < 1) return maxScore;
        len -= 1;
      }
      continue;
    }

    if (scoreList[left] > scoreList[right]) {
      const prevRight = scoreList[right];
      len -= 1;
      while (scoreList[--right] <= prevRight) {
        if (len < 1) return maxScore;
        len -= 1;
      }
      continue;
    }

    if (scoreList[left + 1] > scoreList[right - 1]) {
      left += 1;
    } else {
      right -= 1;
    }
    len -= 1;
  }

  return maxScore;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [listLen, list] = inputString.trim().split("\n");

  console.log(maxTeamScore(list.split(" ").map(Number)));
}
