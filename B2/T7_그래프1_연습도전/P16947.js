// https://www.acmicpc.net/problem/16947
// 서울 지하철 2호선
// 골드 3

const fs = require("fs");
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

function run(input) {
  const N = +input[0];
  const graph = { ...Array.from({ length: N + 1 }).map((_, i) => []) };
  for (let i = 1; i <= N; i++) {
    const [a, b] = input[i].split(" ").map(Number);
    graph[a].push(b);
    graph[b].push(a);
  }
  // console.log(graph);

  const circularLinePoints = findCircularLine();
  // console.log(">>", circularLinePoints);

  const distanceList = Array(N + 1).fill(-1);
  distanceList[0] = 1;
  let step = 0;
  let curStepPoints = circularLinePoints;

  while (distanceList.some((v) => v === -1)) {
    // console.log("[step]", step, " - ", distanceList);
    const nextStepPoints = [];
    for (let point of curStepPoints) {
      if (distanceList[point] === -1) {
        distanceList[point] = step;
        nextStepPoints.push(
          ...graph[point].filter((v) => !curStepPoints.includes(v))
        );
      }
    }
    curStepPoints = [...nextStepPoints];
    step += 1;
  }
  distanceList.shift();

  console.log(distanceList.join(" "));

  // ------------------------------

  function findCircularLine() {
    let circularLine = [];
    for (let startPoint of Array.from({ length: N }).map((_, i) => i + 1)) {
      // console.log("startPoint : ", startPoint);
      circularLine = getCircularLine(startPoint);
      if (circularLine.length > 0) break;
    }
    return circularLine;
  }

  function getCircularLine(startPoint) {
    const line = [];
    const visited = Array(N + 1).fill(false);

    let pointsToCheck = [[startPoint]];
    let step = 0;

    while (pointsToCheck.length > 0) {
      const curPoint = pointsToCheck[step].shift();
      if (!curPoint) {
        pointsToCheck.pop();
        line.pop();
        step -= 1;
        continue;
      }

      if (visited[curPoint]) {
        if (curPoint === startPoint) return line;
        continue;
      }
      visited[curPoint] = true;

      // 방금 온 길 다시 가지 않기 위함
      pointsToCheck.push(graph[curPoint].filter((v) => v !== line.at(-1)));

      line.push(curPoint);
      step += 1;
      // console.log(curPoint, pointsToCheck, line);
    }
    return [];
  }
}
