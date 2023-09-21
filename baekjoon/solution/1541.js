// https://www.acmicpc.net/problem/1541
// 실버 2
// 잃어버린 괄호

// Q: 10+20 - 30+40
// A: (10+20)-(30+40)-10-4
// = -54

// Q: 1+2+3-4-2-1+3+5-2-3
// A: (1+2+3) - 4 - 2 - (1+3+5) - 2 - 3
// = -26

// Q: -10-20+30-10

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
  // const input = inputString.trim().split("\n");
  const input = inputString.trim();
  run(input);
}

function run(input) {
  const splitted = input.split("-");
  // console.log(splitted);

  let res = 0;
  if (splitted[0] === "") {
    splitted[1] = "-" + splitted[1];
  } else {
    res = splitted[0].split("+").reduce((sum, v) => sum + +v, 0);
  }

  for (const chunk of splitted.slice(1)) {
    res -= chunk.split("+").reduce((sum, v) => sum + +v, 0);
  }
  console.log(res);
}
