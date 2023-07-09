// https://www.acmicpc.net/problem/3085
// 사탕 게임
// 실버2

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";

let [N, ...inputs] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;
let nums = inputs.map((input) => input.split(""));
// console.log(nums);

let max = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    getOriSum(i, j);

    if (i + 1 < N) {
      // console.log(`## ${i} ${j} / ${i + 1} ${j}`);
      getColSum(i, j, i + 1);
    }
    if (j + 1 < N) {
      // console.log(`## ${i} ${j} / ${i} ${j + 1}`);
      getRowSum(i, j, j + 1);
    }
  }
}

console.log(max);

function getOriSum(ti, tj) {
  let cnt1 = new Array(N).fill(1);
  let cnt2 = [...cnt1];

  for (let i = 1; i < N; i++) {
    if (nums[i - 1][tj] === nums[i][tj]) cnt1[i] = cnt1[i - 1] + 1;
    if (nums[ti][i - 1] === nums[ti][i]) cnt2[i] = cnt2[i - 1] + 1;
  }

  max = Math.max(max, ...cnt1, ...cnt2);
}

function getColSum(ti, tj, ti2) {
  [nums[ti][tj], nums[ti2][tj]] = [nums[ti2][tj], nums[ti][tj]];

  // i, j -- i+1, j
  let cnt1 = new Array(N).fill(1);
  // i+1, j -- i, j
  let cnt2 = [...cnt1];
  let cnt3 = [...cnt1];

  for (let j = 1; j < N; j++) {
    if (nums[ti][j - 1] == nums[ti][j]) {
      cnt1[j] = cnt1[j - 1] + 1;
    }
    if (nums[ti2][j - 1] == nums[ti2][j]) {
      cnt2[j] = cnt2[j - 1] + 1;
    }
    if (nums[j - 1][tj] == nums[j][tj]) {
      cnt3[j] = cnt3[j - 1] + 1;
    }
  }

  max = Math.max(max, ...cnt1, ...cnt2, ...cnt3);

  [nums[ti][tj], nums[ti2][tj]] = [nums[ti2][tj], nums[ti][tj]];
}

function getRowSum(ti, tj, tj2) {
  [nums[ti][tj], nums[ti][tj2]] = [nums[ti][tj2], nums[ti][tj]];

  // i, j -- i, j+1
  let cnt1 = new Array(N).fill(1);
  // i, j+1 -- i, j
  let cnt2 = [...cnt1];
  let cnt3 = [...cnt1];

  for (let i = 1; i < N; i++) {
    if (nums[i - 1][tj] == nums[i][tj]) {
      cnt1[i] = cnt1[i - 1] + 1;
    }

    if (nums[i - 1][tj2] == nums[i][tj2]) {
      cnt2[i] = cnt2[i - 1] + 1;
    }

    if (nums[ti][i - 1] == nums[ti][i]) {
      cnt3[i] = cnt3[i - 1] + 1;
    }
  }

  max = Math.max(max, ...cnt1, ...cnt2, ...cnt3);

  [nums[ti][tj], nums[ti][tj2]] = [nums[ti][tj2], nums[ti][tj]];
}

/** test
4
ABCD
EFGH
ABKL
NMOP
 */
