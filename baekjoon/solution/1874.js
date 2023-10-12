// https://www.acmicpc.net/problem/1874
// 스택 수열
// 실버 2
// 자료구조, 스택
// 231012

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
function makeArrayByStack(array) {
  let stackOperators = "";

  const stack = [];
  let number = 1;

  for (let cursor = 0; cursor < array.length; cursor += 1) {
    while (stack.length === 0 || stack.at(-1) < array[cursor]) {
      stack.push(number++);
      stackOperators += "+\n";
    }
    let poppedValue = stack.pop();
    if (poppedValue !== array[cursor]) return "NO";
    stackOperators += "-\n";
  }

  return stackOperators;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...array] = inputString.trim().split("\n");
  console.log(makeArrayByStack(array.map(Number)).trim());
}
