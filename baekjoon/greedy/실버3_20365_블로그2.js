// https://www.acmicpc.net/problem/20365
// 실버 3
// 블로그2

// neighbor 블로그를 운영하는 일우는 매일 아침 풀고 싶은 문제를 미리 정해놓고 글을 올린다. 그리고 매일 밤 각각의 문제에 대하여, 해결한 경우 파란색, 해결하지 못한 경우 빨간색으로 칠한다. 일우는 각 문제를 칠할 때 아래와 같은 과정을 한 번의 작업으로 수행한다.

// 연속된 임의의 문제들을 선택한다.
// 선택된 문제들을 전부 원하는 같은 색으로 칠한다.

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      //  "./input4.txt"
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function run(inputArr) {
  const str = inputArr[1];
  const cntRGroup = str.split("R").filter((v) => v !== "").length;
  const cntBGroup = str.split("B").filter((v) => v !== "").length;

  const res = Math.min(cntBGroup, cntRGroup) + 1;
  // console.log(cntRGroup, cntBGroup);
  console.log(res);
}
