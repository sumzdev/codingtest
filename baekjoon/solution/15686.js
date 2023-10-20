// https://www.acmicpc.net/problem/15686
// 치킨 배달
// 골드 5
// 구현, 완전탐색, 백트래킹
// 231020

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 한 집 당 치킨 거리 구하기
// 집 목록 구하기
// 치킨 목록 구하기
// 집의 치킨집당 치킨 거리 구하기
// Map:{ [1, 2]: [1, 1, 1, 3] }
// ---------------------------------------
/**
 *
 *
 * @param {*} N 2 ≤ N ≤ 50
 * @param {*} M 1 ≤ M ≤ 13
 * @param {*} numberList (0|1|2)[N][N]
 */
function findMinChickenStreet(N, M, numberList) {
  // console.log(N, M, numberList);

  const houseList = [];
  const chickenList = [];
  for (let r = 0; r < N; r += 1) {
    for (let c = 0; c < N; c += 1) {
      if (numberList[r][c] === 1) houseList.push([r, c]);
      else if (numberList[r][c] === 2) chickenList.push([r, c]);
    }
  }
  // console.log(houseList, chickenList);

  const getChickenStreetByHouse = ([houseRowIdx, houseColIdx]) =>
    chickenList.map(
      ([cRow, cCol]) =>
        Math.abs(cRow - houseRowIdx) + Math.abs(cCol - houseColIdx)
    );
  const chickenStreetList = houseList.map((v) => getChickenStreetByHouse(v));

  let minChickenStreet = Number.MAX_SAFE_INTEGER;

  const calcChickenStreet = (chickenIdxList) => {
    const chickenStreet = Array.from({ length: houseList.length }).reduce(
      (sum, _, i) =>
        sum +
        Math.min(
          ...chickenStreetList[i].filter((v, i) => chickenIdxList.includes(i))
        ),
      0
    );
    // console.log(chickenIdxList, chickenStreet);
    minChickenStreet = Math.min(chickenStreet, minChickenStreet);
  };

  const selectChicken = (startIdx, selectedChickenList) => {
    // console.log(startIdx, selectedChickenList);
    if (selectedChickenList.length === M) {
      calcChickenStreet(selectedChickenList);
      return;
    }
    for (let idx = startIdx; idx < chickenList.length; idx += 1) {
      selectChicken(idx + 1, [...selectedChickenList, idx]);
    }
  };
  selectChicken(0, []);

  return minChickenStreet;
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
    findMinChickenStreet(
      N,
      M,
      numberList.map((v) => v.split(" ").map(Number))
    )
  );
}
