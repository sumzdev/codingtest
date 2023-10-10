// https://www.acmicpc.net/problem/11663
// 선분 위의 점
// 실버 3
// 이분 탐색
// 231010

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

function findNumOfPointsOfLines(points, lines) {
  // console.log(points, lines);
  let result = "";

  const getStartPoint = (start) => {
    let startIdx = 0;
    let endIdx = points.length - 1;
    while (startIdx <= endIdx) {
      const midIdx = parseInt((startIdx + endIdx) / 2);
      // console.log("[s]", startIdx, endIdx, midIdx);
      if (points[midIdx] < start) startIdx = midIdx + 1;
      else endIdx = midIdx - 1;
    }
    // console.log("start", endIdx + 1);
    return endIdx + 1;
  };

  const getEndPoint = (end) => {
    let startIdx = 0;
    let endIdx = points.length - 1;
    while (startIdx <= endIdx) {
      const midIdx = parseInt((startIdx + endIdx) / 2);
      // console.log("[e]", startIdx, endIdx, midIdx);
      if (points[midIdx] <= end) startIdx = midIdx + 1;
      else endIdx = midIdx - 1;
    }
    // console.log("end", endIdx);
    return endIdx;
  };

  const findNumOfPoints = ([startPoint, endPoint]) => {
    const startIdx = getStartPoint(startPoint);
    const endIdx = getEndPoint(endPoint);
    // console.log(startPoint, endPoint, startIdx, endIdx);
    result += `${startIdx <= endIdx ? endIdx - startIdx + 1 : 0}\n`;
  };

  lines.forEach((line) => findNumOfPoints(line));
  return result;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 3 2 4 2 0
      "./input2.txt", // 0 0
      "./input3.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, points, ...input] = inputString.trim().split("\n");

  console.log(
    findNumOfPointsOfLines(
      points
        .split(" ")
        .map(Number)
        .sort((a, b) => a - b),
      input.map((v) => v.split(" ").map(Number))
    ).trim()
  );
}
