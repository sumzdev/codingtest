// https://www.acmicpc.net/problem/5568
// 카드 놓기
// 실버 4
// 자료 구조, 브루트포스 알고리즘, 해시를 사용한 집합과 맵, 백트래킹
// 231019

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

/**
 *
 * @param {*} N (4 ≤ n ≤ 10)
 * @param {*} K (2 ≤ n ≤ 4)
 * @param {*} cardList 1이상 99이하
 */
function makeNumber(N, K, cardList) {
  // console.log(N, K, cardList);

  const combinationList = new Set();
  const visited = new Array(N).fill(false);

  const addCard = (numberStr, k) => {
    if (k === K) {
      combinationList.add(numberStr);
      // console.log(numberStr);
      return;
    }

    for (let i = 0; i < N; i += 1) {
      if (!visited[i]) {
        visited[i] = true;
        addCard(numberStr + cardList[i], k + 1);
        visited[i] = false;
      }
    }
  };
  addCard("", 0);

  // console.log(combinationList);

  return combinationList.size;
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
  const [N, M, ...cardList] = inputString.trim().split("\n");
  console.log(
    makeNumber(
      +N,
      +M,
      cardList.map(Number).sort((a, b) => a - b)
    )
  );
}
