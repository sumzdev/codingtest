// https://www.acmicpc.net/problem/1789
// 수들의 합
// 실버 5
// 수학, 그리디 알고리즘
// 231008

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function getMaxN(S) {
  let i = 0;
  let sum = 0;
  while (sum + ++i <= S) {
    sum += i;
  }
  // console.log(i - 1, sum);
  return i - 1;
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
  const S = +inputString.trim();
  // 1 ≤ S ≤ 4,294,967,295

  console.log(getMaxN(S));

  // for (let i = 1; i <= 10; i += 1) {
  //   let res = getMaxN(i);
  //   console.log("============", i, res);
  // }
}

// ---------------------------------------
