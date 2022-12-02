// https://www.acmicpc.net/problem/14391
// 종이 조각
// 골드 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
let arr = [];
for (let i = 1; i <= N; i++) {
  arr[i - 1] = input[i].split("").map(Number);
}
// console.log(arr);

let max = 0;
let check = new Array(N).fill(0).map((_) => new Array(M).fill(0));

backtracking(-1);
console.log(max);

function backtracking(curIdx) {
  max = Math.max(max, getSum(arr, check));
  // console.log(...check, getSum(arr, check));

  for (let idx = curIdx + 1; idx < N * M; idx++) {
    checkIdx(idx, 1);
    backtracking(idx);
    checkIdx(idx, 0);
  }
}

function checkIdx(idx, checkVal) {
  let i = Math.floor(idx / M);
  let j = idx - i * M;
  check[i][j] = checkVal;
}

function getSum(arr, check) {
  let sum = 0;
  let visit = new Array(N).fill(0).map((_) => new Array(M).fill(0));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (!visit[i][j]) {
        let tmp = "" + arr[i][j];
        visit[i][j] = 1;
        if (check[i][j] === 0) {
          // 가로
          let tmpJ = j;
          while (++tmpJ < M && !visit[i][tmpJ] && check[i][tmpJ] === 0) {
            visit[i][tmpJ] = 1;
            tmp += arr[i][tmpJ];
          }
        } else {
          // 세로
          let tmpI = i;
          while (++tmpI < N && !visit[tmpI][j] && check[tmpI][j] === 1) {
            visit[tmpI][j] = 1;
            tmp += arr[tmpI][j];
          }
        }
        sum += parseInt(tmp);
      }
    }
  }
  return sum;
}
