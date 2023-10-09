// https://www.acmicpc.net/problem/3079
// 입국심사
// 골드 5
// 이분 탐색
// 231009

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 시도 1) 완전 탐색 - 메모리 초과
// const findMinTime = (TLen, TimeList, M) => {
//   let min = TimeList[0] * M;

//   let nList = Array.from({ length: TLen }).fill(0);

//   const calc = (kIdx, remainM) => {
//     if (remainM === 0) {
//       // console.log(nList);
//       min = Math.min(
//         min,
//         Math.max(...nList.map((numOfM, i) => numOfM * TimeList[i]))
//       );
//       return;
//     }

//     if (kIdx === TLen) return;

//     for (let m = remainM; m >= 0; m -= 1) {
//       nList[kIdx] = m;
//       calc(kIdx + 1, remainM - m);
//     }
//   };
//   calc(0, M);
//   return min;
// };
// ---------------------------------------
// 성공 - 방법 1) 이분 탐색 (반복)
const findMinTime = (TLen, TimeList, M) => {
  let min = 1n;
  let max = 10n ** 9n * M; // 최댓값

  while (min <= max) {
    const mid = (min + max) / 2n;
    const total = TimeList.reduce((sum, t) => sum + mid / t, 0n);
    // 총 인원 수 모자른 경우
    if (total < M) {
      min = mid + 1n;
    } else {
      max = mid - 1n;
    }
  }
  return `${min}`;
};
// ---------------------------------------
// 성공 - 방법 2) - 이분 탐색 (재귀) - Bigint
/**
 * findMinTime
 * @param {*} TLen : 심사관 수 (1 ≤ TLen ≤ 100,000)
 * @param {*} TimeList : 심사관별 심사 시간 목록 (length: TLen)
 * @param {*} M : 심사 대상 인원 수 (1 ≤ M ≤ 1,000,000,000)
 * @returns
 */
// const findMinTime = (TLen, TimeList, M) => {
//   let totalMin = 1n;
//   let max = 10n ** 9n * M; // 최댓값

//   const binarySearchFunc = (min, max) => {
//     if (min > max) return;

//     const mid = (min + max) / 2n;
//     const total = TimeList.reduce((sum, t) => sum + mid / t, 0n);

//     // 총 인원 수 모자른 경우
//     if (total < M) {
//       return binarySearchFunc(mid + 1n, max);
//     }
//     totalMin = mid < min ? mid : min;
//     return binarySearchFunc(min, mid - 1n);
//   };
//   binarySearchFunc(totalMin, max);
//   return `${totalMin}`;
// };
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
  const [N, M] = N_M.split(" ").map(BigInt);
  const T = input.map(BigInt);

  console.log(findMinTime(N, T, M));
}
