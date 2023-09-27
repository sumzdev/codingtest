// https://www.acmicpc.net/problem/1764
// 실버 4
// 듣보잡
// 230927

// ----제출-----------------------------------
const fs = require("fs");
// ------------------------------------------

function run(group1, group2) {
  // console.log(group1, group2);

  const result = [];
  const group1Obj = Object.fromEntries(group1.map((v) => [v, true]));

  group2.forEach((v) => {
    if (group1Obj[v]) result.push(v);
  });

  return result;
}

// -----제출----------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N_M, ...input] = inputString.trim().split("\n");
  const [N, M] = N_M.split(" ").map(Number);

  const group1 = input.splice(0, N);

  const result = run(group1, input);
  console.log(result.length);
  if (result.length > 0) console.log(result.sort().join("\n"));
}
