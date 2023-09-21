// https://www.acmicpc.net/problem/13305
// 실버 4
// 주유소

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", // 18
      "./input2.txt", // 10
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
  const [N, distanceList, priceList] = inputArr;

  return {
    N: +N,
    distanceList: distanceList.split(" ").map(BigInt),
    priceList: priceList.split(" ").map(BigInt),
  };
}

function run(inputArr) {
  const { N, distanceList, priceList } = processInput(inputArr);
  // console.log(N, distanceList, priceList);

  let totalPrice = 0n;
  let min = priceList[0];

  for (let i = 0; i < N - 1; i++) {
    if (min > priceList[i]) min = priceList[i];
    totalPrice += distanceList[i] * min;
  }
  console.log(`${totalPrice}`);
}
