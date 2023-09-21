// https://www.acmicpc.net/problem/9934
// 실버 1
// 완전 이진 트리 - inorder

// N = 4 (0 ~ 14) : 1 + 2 + 4 + 8
// 7 ---
// 3 11 ---
// 1 5 9 13 ---
// 0 2 4 6 8 10 12 14 ---

const fs = require("fs");

function range(N) {
  return Array.from({ length: N }).map((_, i) => i);
}

// 완전 이진트리의 인덱스가 몇번째 depth에 있는지
// if (index % 2 === 0) return treeDepth - 1;
// if ((index - 1) % 4 === 0) return treeDepth - 2;
// if ((index - 3) % 8 === 0) return treeDepth - 3;
// if ((index - 7) % 16 === 0) return treeDepth - 4;
// ...
// else 0;

// cnt |StartIdx |Interval
// 0    0         2
// 1    1         4
// 2    3         8
// 3    7         16
// 4    15        32

function calc(depth) {
  const interval = range(depth).map((v) => Math.pow(2, v + 1));
  const startIdx = range(depth - 2).reduce(
    (prev, v) => [...prev, prev.at(-1) + Math.pow(2, v + 1)],
    [0, 1]
  );

  return (index) => {
    for (const cnt of range(depth)) {
      if ((index - startIdx[cnt]) % interval[cnt] === 0) {
        return depth - (cnt + 1);
      }
    }
    return 0;
  };
}

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

function processInput(inputArr) {
  return { depth: +inputArr[0], inorder: inputArr[1].split(" ").map(Number) };
}

function run(input) {
  const { depth, inorder } = processInput(input);
  // console.log(depth, inorder);

  if (depth === 1) {
    console.log(inorder[0]);
    return;
  }

  const getDepth = calc(depth);

  const tree = range(depth).map(() => "");
  inorder.forEach((v, i) => (tree[getDepth(i)] += ` ${v}`));

  console.log(tree.map((v) => v.trim()).join("\n"));
}
