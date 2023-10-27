// https://www.acmicpc.net/problem/11404
// 플로이드
// 골드 4
// 최단경로, 플로이드-워셜
// 231027
// ---------------------------------------
// - 도시 n(2 ≤ n ≤ 100)개
// - 버스 m(1 ≤ m ≤ 100,000)개
// 모든 도시의 쌍에 대한 최소 비용 구하기
// ---------------------------------------
const fs = require("fs");
const INF = Number.MAX_SAFE_INTEGER;
// ---------------------------------------
function minimumCostForAllCities(numOfCity, numOfBus, busRouteList) {
  // console.log(numOfCity, numOfBus, busRouteList);

  const table = Array.from({ length: numOfCity }, () =>
    Array(numOfCity).fill(INF)
  );
  busRouteList.forEach(([from, to, cost]) => {
    if (table[from - 1][to - 1] > cost) table[from - 1][to - 1] = cost;
  });

  for (let k = 0; k < numOfCity; k += 1) {
    for (let i = 0; i < numOfCity; i += 1) {
      for (let j = 0; j < numOfCity; j += 1) {
        if (i === j || i === k || j === k) continue;
        const transferCost = table[i][k] + table[k][j];
        if (table[i][j] > transferCost) table[i][j] = transferCost;
      }
    }
  }

  return table
    .map((v) => v.map((cost) => (cost === INF ? 0 : cost)).join(" "))
    .join("\n")
    .trim();
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
  const [numOfCity, numOfBus, ...busRouteList] = inputString.trim().split("\n");

  console.log(
    minimumCostForAllCities(
      +numOfCity,
      +numOfBus,
      busRouteList.map((input) => input.split(" ").map(Number))
    )
  );
}
