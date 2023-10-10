// https://www.acmicpc.net/problem/19637
// IF문 좀 대신 써줘
// 실버 3
// 이분 탐색
// 231010

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 시도 1) 틀림 - scoreList 기준으로 이분 탐색
// const findNameList = (listOfPointByTitle, titleList, scoreList) => {
//   let result = "";

//   let startIdx = 0;
//   let endIdx = scoreList.length - 1;

//   let prevIdx = -1;
//   let targetIdx = -1;
//   while (++targetIdx < listOfPointByTitle.length) {
//     if (
//       targetIdx > 0 &&
//       listOfPointByTitle[targetIdx] === listOfPointByTitle[targetIdx - 1]
//     )
//       continue;

//     while (startIdx <= endIdx) {
//       const midIdx = parseInt((startIdx + endIdx) / 2);

//       if (scoreList[midIdx] <= listOfPointByTitle[targetIdx]) {
//         startIdx = midIdx + 1;
//       } else {
//         endIdx = midIdx - 1;
//       }
//     }

//     if (endIdx - prevIdx > 0) {
//       result += `${titleList[targetIdx]}\n`.repeat(endIdx - prevIdx);
//     }
//     prevIdx = endIdx;
//     startIdx -= 1;
//     endIdx = scoreList.length - 1;
//   }
//   return result;
// };
// ---------------------------------------
// 시도 2) listOfPointByTitle 기준으로 이분 탐색
/**
 * 각 캐릭터의 칭호 찾기
 * @param {BigInt[]} listOfPointByTitle (1 <= N <= 10^5)
 * @param {string[]} titleList (1 <= N <= 10^5)
 * @param {BigInt[]} scoreList (1 <= M <= 10^5)
 *  - 점수 범위: 0 <= score <= 10^9
 */
const findNameList = (listOfPointByTitle, titleList, scoreList) => {
  let result = "";

  for (let i = 0; i < scoreList.length; i += 1) {
    let startIdx = 0;
    let endIdx = titleList.length - 1;

    while (startIdx <= endIdx) {
      const midIdx = parseInt((startIdx + endIdx) / 2);

      if (listOfPointByTitle[midIdx] < scoreList[i]) {
        startIdx = midIdx + 1;
      } else {
        endIdx = midIdx - 1;
      }
    }
    result += `${titleList[startIdx]}\n`;
  }
  return result;
};
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      // "./input3.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, ...input] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);

  const listOfPointByTitle = [];
  const titleList = [];
  input.splice(0, N).forEach((inputStr) => {
    const [title, point] = inputStr.split(" ");
    listOfPointByTitle.push(BigInt(point));
    titleList.push(title);
  });

  const scoreList = input.map(BigInt);

  const result = findNameList(listOfPointByTitle, titleList, scoreList);
  console.log(result.trim());
}
