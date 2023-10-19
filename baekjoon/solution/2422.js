// https://www.acmicpc.net/problem/2422
// 한윤정이 이탈리아에 가서 아이스크림을 사먹는데
// 실버 4
// 완전 탐색
// 231019

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

// ---------------------------------------
/**
 *
 * @param {number} N
 * @param {number} M
 * @param {number[][]} badCombinationList
 */
function findNumofCombinations(N, M, badCombinationList) {
  // if (N < 3) return 0;

  const badList = {};
  Array.from({ length: N }).forEach((_, i) => (badList[i + 1] = []));
  badCombinationList.forEach(([type1, type2]) => {
    badList[type1].push(type2);
    badList[type2].push(type1);
  });
  // console.log(badList);

  let cnt = 0;
  const comb = [];

  const makeCombination = (curType, cntType) => {
    // console.log(curType, cntType);

    if (cntType === 3) {
      cnt += 1;
      return;
    }

    for (let nextType = curType + 1; nextType <= N; nextType += 1) {
      let pass = true;
      for (let combIdx = 0; combIdx < comb.length; combIdx += 1) {
        if (badList[comb[combIdx]].includes(nextType)) {
          pass = false;
          break;
        }
      }
      if (pass) {
        comb.push(nextType);
        makeCombination(nextType, cntType + 1);
        comb.pop();
      }
    }
  };

  makeCombination(0, 0);

  return cnt;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, ...numberList] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);
  console.log(
    findNumofCombinations(
      N,
      M,
      numberList.map((v) => v.split(" ").map(Number))
    )
  );
}
