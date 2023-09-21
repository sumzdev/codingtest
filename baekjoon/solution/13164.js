// https://www.acmicpc.net/problem/13164
// 골드 5
// 행복 유치원
// 230919

// A:
// 11 3
// 1 2 4 5 7 9 10 12 13 20 21
// 앞 요소와의 차이
// 0 1 2 1 2 2  1  2  1  7  1
//
// 최대 숫자 K-1개 뽑기 -> 2, 7
// 제외하고 총 합 더하기
// 0 1 [2] 1 2 2  1  2  1  [7]  1
// 0 1 1 2 2 1 2 1 1 = 11

// 테스트 케이스
// 5 3
// 1 1 2 2 30

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [n_k, input] = inputString.trim().split("\n");
  const [N, K] = n_k.split(" ").map(Number);
  run({ N, K, input: input.split(" ").map(Number) });
}

// 틀림
function run({ N, K, input }) {
  // console.log(N, K, input);
  if (N === K) {
    console.log(0);
    return;
  }
  if (K === 1) {
    console.log(`${input[N - 1] - input[0]}`);
    return;
  }

  const diff = input
    .slice(1)
    .map((v, i) => v - input[i])
    .sort((a, b) => a - b);

  // console.log(diff);
  let sum = 0;
  for (let i = 0; i < N - K; i++) sum += diff[i];

  console.log(sum);
}
