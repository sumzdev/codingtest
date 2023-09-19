// https://www.acmicpc.net/problem/16953
// 실버 2
// A → B

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
  // const input = inputString.trim().split("\n");
  const input = inputString.trim();
  run(input);
}

function run(input) {
  const [A, B] = input.split(" ").map(BigInt);

  if (A === B) {
    console.log(1);
    return;
  }

  let list = [A];
  let cnt = 1;

  while (list.length > 0) {
    cnt += 1;
    list = list.flatMap((v) => [v * 10n + 1n, v * 2n]);
    // console.log(list);

    const nextList = [];
    for (let v of list) {
      if (v === B) {
        console.log(cnt);
        return;
      }
      if (v < B) nextList.push(v);
    }

    list = nextList;
  }
  console.log(-1);
}
