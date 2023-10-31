// https://www.acmicpc.net/problem/3151
// 합이 0
// 골드 4
// 투 포인터, 조합, 이분탐색
// 231031
// ---------------------------------------
// 수열 길이 : 1 ≤ N ≤ 10000
// 각 수열 요소 숫자 범위 : -10000 ≤ Ai ≤ 10000
// 3 연속 부분합이 0인 경우의 수 구하기
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 시도 1: 시간 초과 (p1, p2 - 완전 탐색, p3 - 이분 탐색)
// function findCasesSumZero(list) {
//   // console.log(list);

//   const binarySearchAndNumOfTarget = (
//     startIdx,
//     endIdx,
//     target,
//     limitStartIdx
//   ) => {
//     if (startIdx > endIdx) return 0;
//     const midIdx = parseInt((startIdx + endIdx) / 2);

//     if (list[midIdx] === target) {
//       let cnt = 1;

//       let idx = midIdx;
//       while (list[--idx] === target && idx > limitStartIdx) cnt += 1;

//       idx = midIdx;
//       while (list[++idx] === target && idx <= endIdx) cnt += 1;

//       return cnt;
//     }
//     if (list[midIdx] < target)
//       return binarySearchAndNumOfTarget(
//         midIdx + 1,
//         endIdx,
//         target,
//         limitStartIdx
//       );
//     return binarySearchAndNumOfTarget(
//       startIdx,
//       midIdx - 1,
//       target,
//       limitStartIdx
//     );
//   };

//   let cntCases = 0;
//   for (let p1 = 0; p1 < list.length - 2; p1 += 1) {
//     for (let p2 = p1 + 1; p2 < list.length - 1; p2 += 1) {
//       cntCases += binarySearchAndNumOfTarget(
//         p2 + 1,
//         list.length - 1,
//         (list[p1] + list[p2]) * -1,
//         p2
//       );
//     }
//   }

//   return cntCases;
// }
// ---------------------------------------
function combination2(n) {
  return parseInt((n * (n - 1)) / 2);
}

function findCasesSumZero(list) {
  // console.log(list);
  if (list.length < 3) return 0;

  let cntCases = 0;

  let p1 = 0;
  let p2 = 1;
  let p3 = list.length - 1;
  while (list[p1] <= 0) {
    // console.log(p1, p2, p3);

    const sum = list[p1] + list[p2] + list[p3];

    if (sum === 0) {
      if (list[p2] === list[p3]) {
        cntCases += combination2(p3 - p2 + 1);
        p2 = p3;
        // console.log("p2=p3", p2, p3, ">", combination2(p3 - p2 + 1));
      } else {
        let cntSameP2 = 1;
        let cntSameP3 = 1;
        const targetP2 = p2;
        const targetP3 = p3;
        while (list[--p3] === list[targetP3] && p3 > p2) cntSameP3 += 1;
        while (list[++p2] === list[targetP2] && p2 < targetP3) cntSameP2 += 1;

        cntCases += cntSameP2 * cntSameP3;
        // console.log("next", p1, p2, p3, ">", cntSameP2 * cntSameP3);
      }
    } else if (sum > 0) {
      p3 -= 1;
    } else if (sum < 0) {
      p2 += 1;
    }

    if (p2 >= p3) {
      p1 += 1;
      p2 = p1 + 1;
      p3 = list.length - 1;
      // console.log("next", p1, p2, p3);
    }
  }
  return cntCases;
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

  console.log(
    findCasesSumZero(
      list
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b)
    )
  );
}
