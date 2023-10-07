// https://www.acmicpc.net/problem/4256
// 트리
// 골드 2
// 분할 정복, 재귀, 트리
// 231007

// ---------------------------------------
// 전위, 중위 순회 결과로 -> 후위 순위 결과 출력

// 전위 3 2 1 4
// 중위 2 3 4 1
// 후위 2 4 1 3

// 전위 3 6 5 4 8 7 1 2
// 중위 5 6 8 4 3 1 2 7
// 후위 5 8 4 6 2 1 7 3

// 전위 1 2 4 8 9 5 10 11 3 6 12 13 7 14 15
// 중위 8 4 9 2 10 5 11 1 12 6 13 3 14 7 15
// 후위 8 9 4 10 11 5 2 12 13 6 14 15 7 3 1

// 전위 1 2 4 7 9 5 3 6 8
// 중위 7 9 4 2 5 1 3 6 8
// 후위 9 7 4 5 2 8 6 3 1

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function getPostorder(N, preorder, inorder) {
  // console.log(N, preorder, inorder);
  let iCursor = 0;
  let postOrder = [];

  const order = (startIdx, endIdx) => {
    // console.log(startIdx, endIdx, preorder.slice(startIdx, endIdx + 1));
    if (startIdx > endIdx) return;

    if (startIdx === endIdx) {
      postOrder.push(inorder[startIdx]);
      iCursor++;
      return;
    }

    const rootNode = preorder[iCursor++];
    const rootIdx = inorder.findIndex((v) => v === rootNode);

    order(startIdx, rootIdx - 1); // leftTree
    order(rootIdx + 1, endIdx); // rightTree
    postOrder.push(rootNode);
  };
  order(0, N - 1);
  return postOrder.join(" ");
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt",
      "./input2.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  let [T, ...input] = inputString.trim().split("\n");
  let res = "";
  let N, preorder, inorder;
  while (T--) {
    [N, preorder, inorder, ...input] = input;
    res +=
      getPostorder(
        +N,
        preorder.split(" ").map(Number),
        inorder.split(" ").map(Number)
      ) + "\n";
  }
  console.log(res.trim());
}

// ---------------------------------------
