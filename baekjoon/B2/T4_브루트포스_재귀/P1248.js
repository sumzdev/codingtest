// https://www.acmicpc.net/problem/1248
// Guess
// 골드 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let N = +input[0];
let checkArr = [];
let idx = 0;
for (let i = 0; i < N; i++) {
  checkArr[i] = new Array(N);
  for (let j = i; j < N; j++) {
    checkArr[i][j] = input[1][idx++];
  }
}
// console.log(...checkArr);
let dp = new Array(N).fill(0).map((v) => new Array(N).fill(0));

let stack = [];
let res = "";
let comp = false;

function backtracking() {
  if (comp) {
    return;
  }

  if (stack.length > 0 && !check(stack)) {
    return;
  }

  if (stack.length === N) {
    // console.log(stack);
    comp = true;
    res = stack.join(" ");
    return;
  }

  for (let idx = -10; idx <= 10; idx++) {
    stack.push(idx);
    backtracking();
    stack.pop();
  }
}

backtracking();
console.log(res);

function check(arr) {
  let i = arr.length - 1;

  if (val(arr[i]) !== checkArr[i][i]) {
    return false;
  }
  dp[i][i] = arr[i];

  for (let j = i - 1; j >= 0; j--) {
    dp[j][i] = dp[j][i - 1] + arr[i];
    if (val(dp[j][i]) !== checkArr[j][i]) {
      return false;
    }
  }
  return true;
}

function val(num) {
  if (num < 0) return "-";
  else if (num === 0) return "0";
  return "+";
}

// ex)

// console.log(check([-2]));
// console.log(dp);
// [ [ -2, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]

// console.log(check([-2, 5]));
// console.log(dp);
// [ [ -2, 3, 0, 0 ], [ 0, 5, 0, 0 ], [ 0, 0, 0, 0 ], [ 0, 0, 0, 0 ] ]

// console.log(check([-2, 5, -3]));
// console.log(dp);
// [ [ -2, 3, 0, 0 ], [ 0, 5, 2, 0 ], [ 0, 0, -3, 0 ], [ 0, 0, 0, 0 ] ]

// console.log(check([-2, 5, -3, 1]));
// console.log(dp);
// [ [ -2, 3, 0, 1 ], [ 0, 5, 2, 3 ], [ 0, 0, -3, -2 ], [ 0, 0, 0, 1 ] ]
