// https://www.acmicpc.net/problem/2217
// 실버 4
// 로프

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      "./input4.txt",
      "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");

  run({ N, input: input.map(Number) });
}

// [메모리 초과]
// function run({ N, input }) {
//   console.log(N, input);
//   if (N === 1) {
//     console.log(input[0]);
//     return;
//   }

//   let ropeList = [...input];
//   let max = 0;
//   while (ropeList.length > 1) {
//     const lightestWeight = Math.min(...ropeList);
//     const weight = lightestWeight * ropeList.length;
//     if (max < weight) max = weight;
//     ropeList = ropeList.filter((v) => v !== lightestWeight);
//     console.log(ropeList);
//   }
//   console.log(max);
// }

function run({ N, input }) {
  if (N === 1) {
    console.log(input[0]);
    return;
  }

  let ropeList = input.sort((a, b) => a - b);
  // console.log(ropeList);

  let max = 0;
  for (let i = 0; i < N; i++) {
    const weight = ropeList[i] * (N - i);
    if (max < weight) max = weight;
  }
  console.log(max);
}
