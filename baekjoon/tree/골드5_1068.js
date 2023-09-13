// https://www.acmicpc.net/problem/1068
// 트리
// 골드 5

/** 고려하지 못한 반례
2
-1 0
1
 * A : 1
 */

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input3.txt",
      // "./input2.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function makeGraph(inputArr) {
  const N = +inputArr[0];
  const nodeToRemove = +inputArr[2];
  let rootNode = -1;

  const graph = Array.from({ length: N }).map((_) => []);

  inputArr[1]
    .split(" ")
    .map(Number)
    .forEach((value, index) => {
      if (value === -1) {
        rootNode = index;
      } else {
        graph[value] = [...graph[value], index];
      }
    });
  return { N, nodeToRemove, rootNode, graph };
}

function run(input) {
  const { N, nodeToRemove, rootNode, graph } = makeGraph(input);
  // console.log({ N, nodeToRemove, rootNode, graph });

  const check = Array.from({ length: N }).fill(false);

  let leafNodes = [];
  let curNode;
  let nodesToVisit = [rootNode];

  while (nodesToVisit.length > 0) {
    [curNode, ...nodesToVisit] = nodesToVisit;
    if (curNode === nodeToRemove) continue;
    if (check[curNode]) continue;
    check[curNode] = true;

    const resultOfDeletion = graph[curNode].filter((v) => v !== nodeToRemove);

    if (resultOfDeletion.length === 0) {
      leafNodes = [...leafNodes, curNode];
    }

    nodesToVisit = [...nodesToVisit, ...resultOfDeletion];
  }
  // console.log(leafNodes);
  console.log(leafNodes.length);
}
