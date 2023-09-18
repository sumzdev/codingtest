// https://www.acmicpc.net/problem/20300
// 실버 3
// 서강근육맨

const fs = require("fs");

// 추가 케이스
// 5
// 0 1 1 9 9

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

function processInput(inputArr) {
  const [N, amountList] = inputArr;

  return {
    N: +N,
    amountList: amountList
      .split(" ")
      .map(BigInt)
      // .sort((a, b) => a - b) // bigint 정렬 하려면 아래와 같이 해야함
      .sort((a, b) => (a >= b ? 1 : -1)),
  };
}

function run(inputArr) {
  const { N, amountList } = processInput(inputArr);
  // console.log(N, amountList);

  let muscleLoss = amountList.at(-1);
  let muscleLossList = [...amountList];

  if (N % 2 === 1) {
    muscleLossList.pop();
  }

  for (let i = 0; i < muscleLossList.length >> 1; i++) {
    const tmp = muscleLossList[i] + muscleLossList.at(-(i + 1));
    if (muscleLoss < tmp) muscleLoss = tmp;
    // console.log(i, muscleLossList[i], muscleLossList.at(-(i + 1)));
  }
  console.log(`${muscleLoss}`);
}
