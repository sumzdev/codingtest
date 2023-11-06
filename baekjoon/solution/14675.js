// https://www.acmicpc.net/problem/14675
// 단절점과 단절선
// 실버 1
// 트리, 그래프
// 231106
// ---------------------------------------
// 트리 정점 개수 : 2 ≤ N ≤ 100,000
// n-1줄 : 간선 정보
// 질의 개수 1 ≤ q ≤ 100,000
// q줄 : 질의 t k (1 ≤ q ≤ 100,000)
// t==1: k정점이 단점절인가? 1 ≤ k ≤ n
// - leaf 노드 아닌경우 yes
// - N=2인경우 no
// t==2: k번째 간선이 단절선인가? 1 ≤ k ≤ n - 1
// - yes
// ---------------------------------------
function checkCutVertexAndBridge(numOfNodes, edgeList, questionList) {
  // console.log(numOfNodes);
  // console.log(edgeList);
  // console.log(questionList);

  // 노드별로 가진 에지 개수
  const numOfEdgesList = Array(numOfNodes).fill(0);
  edgeList.forEach(([node1, node2]) => {
    numOfEdgesList[node1 - 1] += 1;
    numOfEdgesList[node2 - 1] += 1;
  });
  // console.log(numOfEdgesList);

  let result = "";
  questionList.forEach(([type, n]) => {
    if (type === 2) {
      result += "yes\n";
      return;
    }
    if (numOfNodes === 2) {
      result += "no\n";
      return;
    }
    result += numOfEdgesList[n - 1] > 1 ? "yes\n" : "no\n";
  });

  return result.trim();
}
// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  const numOfNodes = +input.splice(0, 1);
  const edgeList = input
    .splice(0, numOfNodes - 1)
    .map((v) => v.split(" ").map(Number));
  const questionList = input.splice(1).map((v) => v.split(" ").map(Number));

  console.log(checkCutVertexAndBridge(numOfNodes, edgeList, questionList));
}
