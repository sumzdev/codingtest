// https://www.acmicpc.net/problem/22942
// 골드 4
// 데이터 체커

const fs = require("fs");

// 추가 testcase

// (1)
// 2 1
// 3 1

// (2)
// 2 1
// 4 1

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      "./input4.txt",
      "./input5.txt",
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
    circleList: inputArr.slice(1).map((v) => v.split(" ").map(Number)),
  };
}

function getStartAndEndPointList(circleList) {
  return circleList
    .map(([x, r], id) => [
      { x, id, type: "s", v: x - r },
      { x, id, type: "e", v: x + r },
    ])
    .flat()
    .sort((a, b) => a.v - b.v);
}

function run(inputArr) {
  const { N, circleList } = processInput(inputArr);
  // console.log(N, circleList);

  const pointList = getStartAndEndPointList(circleList);
  // console.log(pointList);

  // 한 점에서 만나는 원 확인
  if (new Set(pointList.map((v) => v.v)).size !== circleList.length * 2) {
    console.log("NO");
    return;
  }

  // 겹치는 원 확인
  let stack = [];
  for (const circle of pointList) {
    if (circle.type === "s") {
      stack.push(circle);
      continue;
    }
    if (stack.pop().id !== circle.id) {
      console.log("NO");
      return;
    }
  }
  console.log("YES");
}
