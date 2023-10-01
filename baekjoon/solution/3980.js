// https://www.acmicpc.net/problem/3980
// 골드 5
// 선발 명단
// 231001

// ---------------------------------------

const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 970
      // "./input2.txt", //
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");

  let cnt = 0;
  let result = "";
  while (++cnt <= N) {
    let abilityList = input.splice(0, 11);
    abilityList = abilityList.map((v) => v.split(" ").map(Number));
    const max = getMaxSumAbility(abilityList);
    // console.log(max);
    result += max + "\n";
  }
  console.log(result.trim());
}
// ---------------------------------------
function getMaxSumAbility(abilityList) {
  let max = 0;
  let check = Array.from({ length: 11 }).fill(false);
  let sum = 0;

  const backtracking = (curPlayerIdx) => {
    if (curPlayerIdx === 11) {
      max = Math.max(sum, max);
      // console.log("max!", sum);
    }
    for (let i = 0; i < 11; i += 1) {
      if (check[i]) continue;
      if (abilityList[curPlayerIdx][i] === 0) continue;
      check[i] = true;
      sum += abilityList[curPlayerIdx][i];
      backtracking(curPlayerIdx + 1);
      sum -= abilityList[curPlayerIdx][i];
      check[i] = false;
    }
  };
  backtracking(0);
  return max;
}
