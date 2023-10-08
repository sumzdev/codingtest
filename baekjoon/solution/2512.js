// https://www.acmicpc.net/problem/2512
// 예산
// 실버 2
// 이분 탐색, 매개 변수 탐색
// 231009

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
const sum = (arr) => {
  return arr.reduce((sum, prev) => sum + prev, 0);
};

/**
 * findMaxBudget
 * @param {*} N : 3 이상 10,000 이하
 * @param {*} requestedBudgetList : 1 이상 100,000 이하 숫자 배열
 * @param {*} totalBudget : N 이상 1,000,000,000 이하
 */
const findMaxBudget = (N, requestedBudgetList, totalBudget) => {
  const maxBudget = Math.max(...requestedBudgetList);

  // 요청 예산의 합이 예산 범위 내에 있는 경우
  if (sum(requestedBudgetList) <= totalBudget) return maxBudget;

  const changeUpperBudgetAndSum = (upperBudget) => {
    return sum(
      requestedBudgetList.map((v) => (v > upperBudget ? upperBudget : v))
    );
  };

  const binarySearchFunc = (startNum, endNum, target) => {
    if (startNum > endNum) return endNum;

    const midNum = (startNum + endNum) >> 1;
    const upperBudgetSum = changeUpperBudgetAndSum(midNum);

    if (upperBudgetSum === target) return midNum;

    if (upperBudgetSum < target)
      return binarySearchFunc(midNum + 1, endNum, target);

    return binarySearchFunc(startNum, midNum - 1, target);
  };

  return binarySearchFunc(1, maxBudget, totalBudget);
};

// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, requestedBudgetList, totalBudget] = inputString.trim().split("\n");

  console.log(
    findMaxBudget(+N, requestedBudgetList.split(" ").map(Number), +totalBudget)
  );
}

// ---------------------------------------
