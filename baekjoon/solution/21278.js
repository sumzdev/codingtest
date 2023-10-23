// https://www.acmicpc.net/problem/21278
// 호석이 두 마리 치킨
// 골드 5
// 최단 경로, 플로이드-워셜, 브루트포스 알고리즘
// 231023

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

/**
 * N: 건물 개수
 * M: 도로 개수
 *
 * @param {*} N 2 ≤ N ≤ 100
 * @param {*} M N-1 ≤ M ≤ N*(N-1)/2
 * @param {*} streetList [number, number][]
 * @returns 건물1 건물2 왕복거리총합
 */
function choiceTwoBuilding(N, M, streetList) {
  // console.log(N, M, streetList);

  // 모든 건물(노드) 쌍에 대한 최단거리 테이블 계산
  const streetTable = Array.from({ length: N + 1 }).map((_) =>
    Array.from({ length: N + 1 }).fill(Number.MAX_SAFE_INTEGER)
  );
  streetList.forEach(([a, b]) => {
    streetTable[a][a] = 0;
    streetTable[b][b] = 0;
    streetTable[a][b] = 1;
    streetTable[b][a] = 1;
  });

  // 플로이드 워셜(Floyd Warshall)
  const calcStreetTable = () => {
    for (let k = 1; k <= N; k++) {
      for (let i = 1; i <= N; i += 1) {
        for (let j = 1; j <= N; j++) {
          if (i === j || i === k || j === k) continue;
          if (streetTable[i][j] > streetTable[i][k] + streetTable[k][j]) {
            streetTable[i][j] = streetTable[i][k] + streetTable[k][j];
          }
        }
      }
    }
  };
  calcStreetTable();
  // console.log(streetTable);

  // 거리 총합 최소값, 건물 두개 - 초기값
  let minSum = Number.MAX_SAFE_INTEGER;
  let buildingA = 0;
  let buildingB = 0;

  // 거리 총합 계산하기
  const calcStreetSum = (chickenIdxList) => {
    const streetSum = Array.from({ length: N }).reduce(
      (sum, _, i) =>
        sum +
        Math.min(
          ...streetTable[i + 1].filter((v, idx) => chickenIdxList.includes(idx))
        ),
      0
    );

    if (
      minSum > streetSum ||
      (minSum === streetSum &&
        (buildingA > chickenIdxList[0] ||
          (buildingA === chickenIdxList[0] && buildingB > chickenIdxList[1])))
    ) {
      // console.log(">>", streetSum);
      minSum = streetSum;
      [buildingA, buildingB] = chickenIdxList;
    }
  };

  // 두 개의 건물을 뽑아서 최소 거리 총합 찾기
  const selectBuilding = (startIdx, selectedBuildingList) => {
    if (selectedBuildingList.length === 2) {
      calcStreetSum(selectedBuildingList);
      return;
    }

    for (let i = startIdx; i <= N; i += 1) {
      selectBuilding(i + 1, [...selectedBuildingList, i]);
    }
  };
  selectBuilding(1, []);

  return `${buildingA} ${buildingB} ${minSum * 2}`;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
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
    choiceTwoBuilding(
      N,
      M,
      numberList.map((v) => v.split(" ").map(Number))
    )
  );
}
