// https://www.acmicpc.net/problem/5639
// 이진 검색 트리
// 골드 5
// 트리
// 231106
// ---------------------------------------
// https://www.acmicpc.net/problem/status/5639/17/1
// ---------------------------------------
// 입력 : 이진 검색 트리의 전위 순회 결과
// 출력 : 후위 순회 결과
// ---------------------------------------
class Node {
  constructor(value) {
    this.parent = undefined;
    this.left = undefined;
    this.right = undefined;
    this.value = value;
  }
}

function postOrderResult(rootNode) {
  let result = "";

  const postOrder = (node) => {
    if (!node) return;
    postOrder(node.left);
    postOrder(node.right);
    result += node.value + " ";
  };
  postOrder(rootNode);
  return result.trim();
}

function getPostOrder(preOrder) {
  // make tree
  const rootNode = new Node(preOrder[0]);
  let curNode = rootNode;

  for (let idx = 1; idx < preOrder.length; idx += 1) {
    const newNode = new Node(preOrder[idx]);
    if (curNode.value > preOrder[idx]) {
      curNode.left = newNode;
      newNode.parent = curNode;
      curNode = newNode;
      continue;
    }
    while (curNode.parent && curNode.parent.value < newNode.value) {
      curNode = curNode.parent;
    }
    while (curNode.right) {
      curNode = curNode.right;
    }

    if (curNode.value > newNode.value) {
      curNode.left = newNode;
    } else {
      curNode.right = newNode;
    }
    newNode.parent = curNode;
    curNode = newNode;
  }

  return postOrderResult(rootNode);
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
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");

  console.log(getPostOrder(input.map(Number)));
}
