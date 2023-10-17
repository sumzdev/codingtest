// https://www.acmicpc.net/problem/1969
// DNA
// 실버 4
// 완전 탐색
// 231018

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 추가 테스트 케이스
// 2 2
// DD
// AA
// -> AA 2
// ---------------------------------------
/**
 *
 * @param {number} N : 1 <= N <= 1000
 * @param {number} M : 1 <= M <= 50
 * @param {string[]} dnaList
 */
function hammingDistance(N, M, dnaList) {
  // console.log(N, M, dnaList);
  let hammingDistanceMinStr = "";
  let hammingDistanceSum = 0;

  for (let i = 0; i < M; i += 1) {
    const cntDNAChar = {};
    for (let n = 0; n < N; n += 1) {
      cntDNAChar[dnaList[n][i]] = cntDNAChar[dnaList[n][i]] + 1 || 1;
    }
    // console.log(cntDNAChar);

    let max = 0;
    let maxChar = "";
    for (const dnaChar in cntDNAChar) {
      if (
        cntDNAChar[dnaChar] > max ||
        (cntDNAChar[dnaChar] === max && maxChar > dnaChar) // 같을 경우 사전순
      ) {
        max = cntDNAChar[dnaChar];
        maxChar = dnaChar;
      }
    }
    hammingDistanceMinStr += maxChar;
    hammingDistanceSum += N - max;
  }

  return `${hammingDistanceMinStr}\n${hammingDistanceSum}`;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // TAAGATAC 7
      "./input2.txt", // ACGTACGTAA 6
      "./input3.txt", // AAGTTACCAA 12
      "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, ...dnaList] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);
  console.log(hammingDistance(N, M, dnaList));
}
