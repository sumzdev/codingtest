// https://www.acmicpc.net/problem/2800
// 골드 5
// 괄호 제거

const fs = require("fs");

// 추가 테스트 케이스
// Q: (((1)))(2)
// A:
// (((1)))2
// ((1))(2)
// ((1))2
// (1)(2)
// (1)2
// 1(2)
// 12

// 다른 답안 : https://www.acmicpc.net/source/57683577

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : ["./input1.txt", "./input2.txt", "./input3.txt", "./input4.txt"];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("");
  run(input);
}

function range(N) {
  return Array.from({ length: N }).map((_, i) => i);
}

// arr.reverse
function getCombination(arr, num = arr.length) {
  let [cur, ...rest] = arr;
  let result = [[cur]];
  while (rest.length > 0) {
    [cur, ...rest] = rest;
    result = [...result.map((v) => [cur, ...v]), [cur], ...result];
  }
  return result;
}

function findBracketPair(arr) {
  let result = [];
  let stack = [];

  arr.forEach((v, i) => {
    if (v === "(") {
      stack = [...stack, i];
    } else if (v === ")") {
      const poppedValue = stack.pop();
      result = [...result, [poppedValue, i]];
    }
  });

  return result;
}

function getCombinationBlankList(bracketPairIndexList) {
  const [_, ...combinationList] = getCombination(
    range(bracketPairIndexList.length).reverse()
  );
  // console.log(combinationList);

  return combinationList.map((indexList) =>
    bracketPairIndexList.filter((v, i) => indexList.includes(i)).flat()
  );
}

function getFormulaCombinationList(
  formula,
  bracketPairIndexList,
  combinationIndexList
) {
  const emptyFormula = formula.map((v, i) =>
    bracketPairIndexList.flat().includes(i) ? "" : v
  );

  // console.log(formula);
  // console.log(emptyFormula);
  // console.log(combinationIndexList);

  return [
    ...new Set(
      combinationIndexList.map((indexList) =>
        emptyFormula
          .map((v, i) => (indexList.includes(i) ? formula[i] : v))
          .join("")
      )
    ),
  ]
    .sort()
    .concat(emptyFormula.join(""))
    .join("\n");
}
function run(input) {
  // console.log(input);

  const bracketPairIndexList = findBracketPair(input);
  // console.log(bracketPairIndexList);

  const combinationIndexList = getCombinationBlankList(bracketPairIndexList);
  // console.log(combinationIndexList);

  const formulaCombinationList = getFormulaCombinationList(
    input,
    bracketPairIndexList,
    combinationIndexList
  );
  console.log(formulaCombinationList);
}
