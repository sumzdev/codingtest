// https://www.acmicpc.net/problem/1174
// 골드 5
// 줄어드는 수
// 230930

// ---------------------------------------

const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 0
      // "./input2.txt", // 10
      // "./input3.txt", // 20
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  // const input = inputString.trim().split("\n");
  const N = +inputString;
  console.log(getDecreasingNumber(N));

  // console.log("======", 1024, getDecreasingNumber(1024));
}
// ---------------------------------------

function getDecreasingNumber(N) {
  if (N <= 11) {
    return N - 1;
  }
  let cnt = 10;
  let numArr = [0, 1];

  while (++cnt < N) {
    numArr[0] += 1;

    for (let i = 1; i < numArr.length; i += 1) {
      if (numArr[i - 1] >= numArr[i]) {
        numArr[i - 1] = i == 1 ? 0 : numArr[i - 2] + 1;
        numArr[i] += 1;
      }

      if (numArr[i] > 9) {
        numArr[i] = numArr[i - 1] + 1;
        numArr.push(numArr[i] + 1);

        if (numArr.at(-1) === 10) return -1;
      }
      // console.log(cnt, i, [...numArr].reverse());
    }
    // console.log("res", cnt, "==", [...numArr].reverse());
  }

  return numArr.reverse().join("");
}
