// https://www.acmicpc.net/problem/10815
// 숫자 카드
// 실버 5
// 자료 구조, 정렬(x), 이분 탐색, 해시를 사용한 집합과 맵
// 231008

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function hasM(strN, strM) {
  let n = {};
  strN.split(" ").forEach((v) => (n[v] = true));
  const resultOfHasM = strM.split(" ").map((v) => (n[v] ? "1" : "0"));
  return resultOfHasM.join(" ");
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [, strN, , strM] = inputString.trim().split("\n");

  console.log(hasM(strN, strM));
}

// ---------------------------------------
