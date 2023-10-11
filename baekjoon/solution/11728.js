// https://www.acmicpc.net/problem/11728
// 배열 합치기
// 실버 5
// 투 포인터, 정렬
// 231011

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function mergeAndSortTwoArray(arrA, arrB) {
  let cursorA = 0;
  let cursorB = 0;

  let result = "";
  while (cursorA < arrA.length && cursorB < arrB.length) {
    if (arrA[cursorA] < arrB[cursorB]) {
      result += arrA[cursorA++] + " ";
    } else {
      result += arrB[cursorB++] + " ";
    }
  }
  while (cursorA < arrA.length) result += arrA[cursorA++] + " ";
  while (cursorB < arrB.length) result += arrB[cursorB++] + " ";
  return result;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 2 3 5 9
      "./input2.txt", // 1 4 7
      "./input3.txt", // 1 2 3 4 5 7 9
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [arraySizeStr, sortedArrA, sortedArrB] = inputString.trim().split("\n");

  console.log(
    mergeAndSortTwoArray(
      sortedArrA.split(" ").map(Number),
      sortedArrB.split(" ").map(Number)
    ).trim()
  );
}
