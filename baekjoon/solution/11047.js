// https://www.acmicpc.net/problem/11047
// 실버 4
// 동전 0

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  run(input);
}

function processInput(inputArr) {
  const [n, ...inputs] = inputArr;
  const [N, K] = n.split(" ").map(Number);

  return {
    N,
    K,
    coinList: inputs.map(Number).sort((a, b) => b - a),
  };
}

function run(inputArr) {
  const { N, K, coinList } = processInput(inputArr);
  // console.log(N, K, coinList);

  let totalCnt = 0;
  let rest = K;
  for (let i = 0; i < N; i++) {
    if (rest < coinList[i]) continue;
    const cnt = Math.floor(rest / coinList[i]);
    rest = rest - coinList[i] * cnt;
    totalCnt += cnt;
  }
  console.log(totalCnt);
}
