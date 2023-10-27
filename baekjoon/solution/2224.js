// https://www.acmicpc.net/problem/2224
// 명제 증명
// 골드 4
// 최단경로, 플로이드-워셜
// 231027
// ---------------------------------------
const fs = require("fs");
const INF = Number.MAX_SAFE_INTEGER;
// ---------------------------------------
function proofofProposition(numOfProposition, propositionList) {
  // console.log(numOfProposition, propositionList);
  const nodeList = Object.fromEntries(
    [...new Set(propositionList.flat())]
      .sort((a, b) => (a > b ? 1 : -1))
      .map((v, idx) => [v, idx])
  );
  // console.log("nodeList", nodeList);

  const numOfNode = Object.keys(nodeList).length;
  const table = Array.from({ length: numOfNode }, () =>
    Array(numOfNode).fill(0)
  );
  propositionList.forEach(([from, to]) => {
    table[nodeList[from]][nodeList[to]] = 1;
  });

  for (let k = 0; k < numOfNode; k += 1) {
    for (let i = 0; i < numOfNode; i += 1) {
      for (let j = 0; j < numOfNode; j += 1) {
        if (i === j || i === k || j === k) continue;
        if (table[i][k] && table[k][j]) table[i][j] = 1;
      }
    }
  }
  // console.log(table);
  let result = "";
  let cntResult = 0;
  const nodeKeyList = Object.keys(nodeList);
  for (let i = 0; i < numOfNode; i += 1) {
    for (let j = 0; j < numOfNode; j += 1) {
      if (i === j) continue;
      if (table[i][j]) {
        cntResult += 1;
        result += `${nodeKeyList[i]} => ${nodeKeyList[j]}\n`;
      }
    }
  }
  return cntResult + "\n" + result.trim();
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
  const [numOfProposition, ...propositionList] = inputString.trim().split("\n");

  console.log(
    proofofProposition(
      +numOfProposition,
      propositionList.map((input) => input.split(" => "))
    )
  );
}
