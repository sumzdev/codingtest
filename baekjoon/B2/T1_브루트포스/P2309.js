// https://www.acmicpc.net/problem/2309
// 일곱 난쟁이

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let nums = fs.readFileSync(filePath).toString().trim().split("\n").map(Number);

// 2명을 제외했을 때의 합이 100이 되는 것을 찾음
for (let r1 = 0; r1 < nums.length - 1; r1++) {
  for (let r2 = r1 + 1; r2 < nums.length; r2++) {
    if (getSum(r1, r2) == 100) {
      console.log(
        nums
          .filter((_, idx) => idx !== r1 && idx !== r2)
          .sort((a, b) => a - b)
          .join("\n")
      );
      return;
    }
  }
}

function getSum(r1, r2) {
  return nums.reduce(
    (sum, val, idx) => (idx !== r1 && idx !== r2 ? sum + val : sum),
    0
  );
}
