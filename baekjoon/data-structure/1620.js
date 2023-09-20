// https://www.acmicpc.net/problem/1620
// 실버 4
// 나는야 포켓몬 마스터 이다솜
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

// 시간초과
// function run({ N, K, list, questionList }) {
//   // console.log(N, K, list, questionList);

//   let result = "";
//   for (const question of questionList) {
//     const num = parseInt(question);
//     if (!Number.isNaN(num)) {
//       result += list[num - 1] + "\n";
//       continue;
//     }
//     result += list.findIndex((v) => v === question) + 1 + "\n";
//   }
//   console.log(result.trim());
// }

function run({ N, K, list, questionList }) {
  // console.log(N, K, list, questionList);
  let obj = {};
  list.forEach((v, i) => (obj[v] = i + 1));

  let result = "";
  for (const question of questionList) {
    const num = parseInt(question);
    if (!Number.isNaN(num)) {
      result += list[num - 1] + "\n";
      continue;
    }
    result += obj[question] + "\n";
  }
  console.log(result.trim());
}
