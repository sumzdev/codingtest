// https://www.acmicpc.net/problem/1946
// 신입 사원
// 실버1
// 그리디
// 231116
// ---------------------------------------
// [1,5] - s2min:5 / cnt:1
// [2,2] - s2min:2 / cnt:2
// [3,4] - min보다큼 / cnt:2
// [4,3] - min보다큼 / cnt:2
// [5,1] - s2min:1 / cnt:3
// ---------------------------------------
// 등수 목록[A등수, B등수][]에서 두 등수 모두 꼴찌 점수 보다 하나라도 높은가

function greedy(twoScoreList) {
  const sortedList = twoScoreList.sort(([as1, as2], [bs1, bs2]) => as1 - bs1);
  // console.log(sortedList.join("\n"));

  return sortedList.reduce(
    ([cnt, s2Min], [s1, s2]) => [
      s2 <= s2Min ? cnt + 1 : cnt,
      Math.min(s2Min, s2),
    ],
    [0, twoScoreList[0][1]]
  )[0];
}

// ---------------------------------------
const fs = require("fs");
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
  const input = fs.readFileSync(filePath);
  const [numOfTest, ...inputLine] = input.toString().trim().split("\n");
  let testCase = +numOfTest;
  let result = "";

  while (testCase--) {
    const num = +inputLine.shift();

    // [score1, score2][]
    const twoScoreList = inputLine
      .splice(0, num)
      .map((v) => v.split(" ").map(Number));
    // console.log(twoScoreList);

    result += greedy(twoScoreList) + "\n";
  }

  console.log(result.trim());
}
