// https://www.acmicpc.net/problem/1991
// 실버 1
// 트리 순회

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function makeTree(inputArr) {
  const tree = {};

  for (const str of inputArr.slice(1)) {
    const [key, left, right] = str
      .split(" ")
      .map((v) => (v === "." ? null : v));
    tree[key] = {
      left,
      right,
    };
  }

  return {
    N: +inputArr[0],
    tree,
  };
}

function run(input) {
  const { N, tree } = makeTree(input);
  // console.log(N, tree);

  let res = "";
  const log = (s) => {
    res += s;
  };

  const rootNodeKey = "A";

  const preorder = (curNodeKey) => {
    if (!tree[curNodeKey]) return;
    log(curNodeKey);
    preorder(tree[curNodeKey].left);
    preorder(tree[curNodeKey].right);
  };

  const inorder = (curNodeKey) => {
    if (!tree[curNodeKey]) return;
    inorder(tree[curNodeKey].left);
    log(curNodeKey);
    inorder(tree[curNodeKey].right);
  };

  const postorder = (curNodeKey) => {
    if (!tree[curNodeKey]) return;
    postorder(tree[curNodeKey].left);
    postorder(tree[curNodeKey].right);
    log(curNodeKey);
  };

  preorder(rootNodeKey);
  log("\n");
  inorder(rootNodeKey);
  log("\n");
  postorder(rootNodeKey);

  console.log(res);
}
