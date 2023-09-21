// https://www.acmicpc.net/problem/14425
// 실버 3
// 문자열 집합
// 230919

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      // "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [n_k, ...input] = inputString.trim().split("\n");
  const [N, K] = n_k.split(" ").map(Number);
  run({ N, K, list: input.slice(0, N), questionList: input.slice(N) });
}

function run({ N, K, list, questionList }) {
  // console.log(N, K, list, questionList);

  let obj = {};
  list.forEach((v, i) => (obj[v] = i + 1));

  let cnt = 0;
  for (const question of questionList) {
    if (obj[question]) cnt++;
  }
  console.log(cnt);
}
