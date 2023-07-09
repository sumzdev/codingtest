// https://www.acmicpc.net/problem/14500
// 테트로미노
// 골드 4

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

// string array
let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [N, M] = input[0].split(" ").map(Number);
// 4 <= N, M <= 500

let pane = [];
for (let idx = 1; idx < N + 1; idx++) {
  pane.push(input[idx].split(" ").map(Number));
}
// console.log(pane);

let dd = [
  [-1, 0],
  [0, -1],
  [0, 1],
  [1, 0],
];

let maxSum = 0;
let visit = new Array(N).fill(0).map((_) => new Array(M).fill(false));
let maxVal = pane.reduce((max, v) => Math.max(max, ...v), 0);

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    // console.log("----->>", i, j);
    visit[i][j] = true;
    dfs(i, j, 1, pane[i][j]);
    visit[i][j] = false;
  }
}
console.log(maxSum);

function dfs(x, y, cnt, sum) {
  // console.log("cnt : ", cnt, x, y);
  if (sum + maxVal * (4 - cnt) <= maxSum) return;

  if (cnt == 4) {
    maxSum = Math.max(maxSum, sum);
    return;
  }

  for (let [nx, ny] of dd.map(([xx, yy]) => [x + xx, y + yy])) {
    if (0 <= nx && nx < N && 0 <= ny && ny < M && !visit[nx][ny]) {
      if (cnt == 2) {
        visit[nx][ny] = true;
        dfs(x, y, cnt + 1, sum + pane[nx][ny]);
        visit[nx][ny] = false;
      }
      visit[nx][ny] = true;
      dfs(nx, ny, cnt + 1, sum + pane[nx][ny]);
      visit[nx][ny] = false;
    }
  }
}

// -------- 처음 푼 답안 - 시간초과
// https://www.acmicpc.net/problem/14500
// 테트로미노
// 골드 4

// const fs = require("fs");
// const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

// // string array
// let input = fs.readFileSync(filePath).toString().trim().split("\n");

// let [N, M] = input[0].split(" ").map(Number); // 4 <= N, M <= 500

// let pane = [];
// for (let idx = 1; idx < N + 1; idx++) {
//   pane.push(input[idx].split(" ").map(Number));
// }
// // console.log(pane);
// const around = [
//   [-1, 0],
//   [0, -1],
//   [0, 1],
//   [1, 0],
// ];

// let maxSum = 0;
// let check = initCheck();

// let maxIdxs = [];
// let maxVal = 0;
// pane.forEach((list, i) => {
//   list.forEach((v, j) => {
//     if (v > maxVal) {
//       maxVal = v;
//       maxIdxs = [[i, j]];
//     } else if (v == maxVal) {
//       maxIdxs.push([i, j]);
//     }
//   });
// });
// // console.log(maxVal, maxIdxs);

// for (let [i, j] of maxIdxs) {
//   let sum = getMaxAround(i, j, check);
//   maxSum = sum > maxSum ? sum : maxSum;
// }
// console.log(maxSum);

// // ------------------------------
// function getMaxAround(i, j) {
//   let sum = pane[i][j];

//   let check = initCheck();
//   check[i][j] = true;

//   let max = -1;
//   let maxIdx = [i, j];
//   let tmp = [];
//   let tmpIdx = [];

//   let cnt = 3;
//   while (cnt--) {
//     let idxList = around.map(([x, y]) => [x + maxIdx[0], y + maxIdx[1]]);
//     max = 0;
//     maxIdx = [-9, -9];
//     for (let [x, y] of idxList) {
//       if (x >= 0 && y >= 0 && x < N && y < M && !check[x][y]) {
//         if (max < pane[x][y]) {
//           tmp.push(max);
//           tmpIdx.push(maxIdx);
//           [max, maxIdx] = [pane[x][y], [x, y]];
//         } else if (pane[x][y] > 0) {
//           tmp.push(pane[x][y]);
//           tmpIdx.push([x, y]);
//         }
//         check[x][y] = true;
//       }
//     }

//     let tmpMax = Math.max(...tmp);
//     if (max < Math.max(...tmp)) {
//       let tmpMaxIdx = tmp.indexOf(tmpMax);
//       [max, maxIdx] = [tmpMax, tmpIdx[tmpMaxIdx]];
//       tmp.splice(tmpMaxIdx, 1);
//       tmpIdx.splice(tmpMaxIdx, 1);
//     }
//     sum += max;
//   }
//   // console.log("=========>", sum);
//   return sum;
// }

// function initCheck() {
//   return new Array(N).fill(0).map((_) => new Array(M).fill(false));
// }
