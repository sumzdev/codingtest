const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");

let testCaseCnt = parseInt(lineInput.shift());

let result = [];

testcase: while (testCaseCnt--) {
  let [cnt, snum] = lineInput
    .shift()
    .split(" ")
    .map((v) => parseInt(v));
  let queue = lineInput
    .shift()
    .split(" ")
    .map((v) => parseInt(v));

  let cur = 0;
  let printCnt = 0;
  while (printCnt < cnt) {
    let value = queue[cur];
    if (value >= Math.max(...queue)) {
      printCnt++;
      queue[cur] = 0;
      if (cur == snum) {
        result.push(printCnt);
        continue testcase;
      }
    }
    cur = ++cur >= cnt ? cur % cnt : cur;
  }
}

console.log(result.join("\n"));
