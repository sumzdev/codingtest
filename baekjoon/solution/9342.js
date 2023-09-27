// https://www.acmicpc.net/problem/9342
// 실버 3
// 염색체
// 230927

// ----제출-----------------------------------
const fs = require("fs");
// ------------------------------------------

const A_F = ["A", "B", "C", "D", "E", "F"];

function check(str) {
  // console.log("=====", str);
  let strArr = str.split("");
  let idx = 0;

  // 1) {A, B, C, D, E, F} 중 0개 또는 1개로 시작
  if (!A_F.includes(strArr[idx])) {
    return false;
  }

  // 2) 그 다음에는 A가 하나 또는 그 이상 있어야 한다.
  let checkA = strArr[0] === "A";
  while (strArr[++idx] === "A") checkA = true;
  // console.log("A", checkA, idx);
  if (!checkA) return false;
  idx -= 1;

  // 3) 그 다음에는 F가 하나 또는 그 이상 있어야 한다.
  let checkF = false;
  while (strArr[++idx] === "F") checkF = true;
  // console.log("F", checkF, idx);
  if (!checkF) return false;
  idx -= 1;

  // 4) 그 다음에는 C가 하나 또는 그 이상 있어야 한다.
  let checkC = false;
  while (strArr[++idx] === "C") checkC = true;
  // console.log("C", checkC, idx);
  if (!checkC) return false;
  idx -= 1;

  if (idx === strArr.length) {
    return true;
  } else if (idx === strArr.length - 1 && A_F.includes(strArr[idx])) {
    return true;
  }

  return false;
}

// -----제출----------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  let [N, ...input] = inputString.trim().split("\n");
  // N = +N;

  let res = "";
  input.forEach((v) => (res += check(v) ? "Infected!\n" : "Good\n"));
  // input.forEach((v) => console.log("res", check(v)));

  console.log(res.trim());
}
