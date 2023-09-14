// https://www.acmicpc.net/problem/2346
// 실버 3
// 풍선 터뜨리기

// node.js - 메모리 초과 문제로 성공 확인 못함

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt"
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function processInput(inputArr) {
  return {
    N: +inputArr[0],
    balloons: inputArr[1].split(" ").map((v, i) => [i + 1, +v]),
  };
}

function run(input) {
  let { N, balloons } = processInput(input);
  // console.log(balloons);

  let res = [];
  let curIdx = 0;
  let paper = 0;

  const burst = (index) => {
    res = [...res, balloons[index][0]];
    paper = balloons[index][1] - 1;
    balloons = balloons.filter((_, i) => i !== index);
  };

  const getNextIndex = (move) => {
    let nextIndex = move % balloons.length;
    return nextIndex >= 0 ? nextIndex : balloons.length + nextIndex;
  };

  while (balloons.length > 0) {
    curIdx = getNextIndex(curIdx + paper);
    // console.log("#", res, curIdx, balloons);
    burst(curIdx);
  }
  console.log(res.join(" "));
}
