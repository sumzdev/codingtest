// https://www.acmicpc.net/problem/17073
// 나무 위의 빗물
// 골드 5
// 트리, 그래프
// 231107
// ---------------------------------------
function getLeafNodes(numOfNodes, edgeList) {
  const nodesIsLeaf = Array(numOfNodes).fill(0);
  edgeList.forEach(([node1, node2]) => {
    nodesIsLeaf[node1 - 1] += 1;
    nodesIsLeaf[node2 - 1] += 1;
  });

  return nodesIsLeaf.filter((v, idx) => idx !== 0 && v === 1).length;
}
// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", //
      // "./input2.txt", //
      "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...edgeList] = inputString.trim().split("\n");
  const [numOfNodes, totalWater] = info.split(" ").map(Number);

  const numOfLeafNodes = getLeafNodes(
    numOfNodes,
    edgeList.map((v) => v.split(" ").map(Number))
  );
  console.log(totalWater / numOfLeafNodes);
}
