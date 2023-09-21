// https://www.acmicpc.net/problem/2493
// 골드 5
// 탑

// spread 연산자, destructuring 사용 -> 메모리 초과
// push, pop -> 통과

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      // "./input4.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function processInput(inputArr) {
  return {
    N: +inputArr[0],
    topHeight: inputArr[1].split(" ").map(Number),
  };
}

// [메모리 초과]
// function run(inputArr) {
//   const { N, topHeight } = processInput(inputArr);
//   // console.log(topHeight);

//   let result = "";
//   let stack = [[0, 0]]; // [index, value][]

//   topHeight.forEach((value, i) => {
//     let check = false;
//     while (stack.length > 0) {
//       const poppedValue = stack.pop();
//       if (poppedValue[1] > value) {
//         stack = [...stack, poppedValue, [i + 1, value]];
//         result += ` ${poppedValue[0]}`;
//         check = true;
//         break;
//       }
//     }
//     if (!check) {
//       stack = [[i + 1, value]];
//       result += ` ${0}`;
//     }
//   });

//   console.log(result.trim());
// }

// [메모리 초과]
// function run(inputArr) {
//   const { N, topHeight } = processInput(inputArr);
//   // console.log(topHeight);

//   let result = "";
//   let reversedStack = [-1];
//   let _;

//   for (let i = 0; i < topHeight.length; i++) {
//     while (
//       reversedStack.length > 0 &&
//       topHeight[reversedStack[0]] < topHeight[i]
//     ) {
//       [_, ...reversedStack] = reversedStack;
//     }

//     result += reversedStack.length === 0 ? " 0" : ` ${reversedStack[0] + 1}`;
//     reversedStack = [i, ...reversedStack];
//   }

//   console.log(result.trim());
// }

function run(inputArr) {
  const { N, topHeight } = processInput(inputArr);
  // console.log(topHeight);

  let result = "";
  let stack = [-1];

  for (let i = 0; i < topHeight.length; i++) {
    while (
      stack.length > 0 &&
      topHeight[stack.at(-1)] < topHeight[i]
      // topHeight[stack[stack.length - 1]] < topHeight[i]
    ) {
      stack.pop();
    }

    result += stack.length === 0 ? " 0" : ` ${stack.at(-1) + 1}`;
    // stack = [...stack, i]; // 메모리 초과
    stack.push(i);
  }

  console.log(result.trim());
}
