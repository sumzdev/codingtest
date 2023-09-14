// https://www.acmicpc.net/problem/2504
// 골드 5
// 괄호의 값

// testcase 1)
// Q: [][
// A: 0

// testcase 2)
// Q: ((][)))
// A: 0

// testcase 3)
// Q: (()([)])
// A: 0

// testcase 4)
// Q: ([())
// A: 0

const fs = require("fs");

const BracketValues = {
  ")": {
    openingBracket: "(",
    value: 2,
  },
  "]": {
    openingBracket: "[",
    value: 3,
  },
};

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : ["./input1.txt", "./input2.txt", "./input3.txt", "./input4.txt"];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function run(input) {
  const charArray = input[0].split("");

  let stack = [];

  for (const char of charArray) {
    if (["]", ")"].includes(char)) {
      const { value: bracketValue, openingBracket } = BracketValues[char];

      let check = false;
      let tmp = [];

      while (stack.length > 0) {
        const poppedValue = stack.pop();
        if (poppedValue === openingBracket) {
          check = true;
          break;
        }

        tmp = [...tmp, poppedValue];
      }

      if (!check) {
        console.log(0);
        return;
      }

      // console.log(tmp);
      const sum = getSum(tmp);
      if (isNaN(sum)) {
        console.log(0);
        return;
      }

      stack = [...stack, sum === 0 ? bracketValue : sum * bracketValue];
    } else {
      // char === "(" || char === "["
      stack = [...stack, char];
    }
  }

  const sum = getSum(stack);
  console.log(isNaN(sum) ? 0 : sum);
}

function getSum(array) {
  return array.reduce((sum, cur) => sum + cur, 0);
}
