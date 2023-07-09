// https://www.acmicpc.net/problem/1932
// 정수 삼각형

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, ...lines] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;

let dp = new Array(N).fill(0);
dp[0] = parseInt(lines[0]);
let tmp = [...dp];

for (let depth = 2; depth <= N; depth++) {
  let nums = lines[depth - 1].split(" ").map(Number);
  // console.log(">>", nums);

  nums.forEach((v, idx) => {
    tmp[idx] = idx < nums.length ? dp[idx] + v : dp[idx];
    tmp[idx] = idx - 1 >= 0 ? Math.max(tmp[idx], dp[idx - 1] + v) : tmp[idx];
    // console.log(v, idx, tmp);
  });

  dp = [...tmp];
}
console.log(Math.max(...dp));

// >> [7]
// [ 7, 0, 0, 0, 0 ]

// >> [ 3, 8 ]
// 3 0 [ 10, 0, 0, 0, 0 ]
// 8 1 [ 10, 15, 0, 0, 0 ]

// >> [ 8, 1, 0 ]
// 8 0 [ 18, 15, 0, 0, 0 ]
// 1 1 [ 18, 16, 0, 0, 0 ]
// 0 2 [ 18, 16, 15, 0, 0 ]

// >> [ 2, 7, 4, 4 ]
// 2 0 [ 20, 16, 15, 0, 0 ]
// 7 1 [ 20, 25, 15, 0, 0 ]
// 4 2 [ 20, 25, 20, 0, 0 ]
// 4 3 [ 20, 25, 20, 19, 0 ]

// >> [ 4, 5, 2, 6, 5 ]
// 4 0 [ 24, 25, 20, 19, 0 ]
// 5 1 [ 24, 30, 20, 19, 0 ]
// 2 2 [ 24, 30, 27, 19, 0 ]
// 6 3 [ 24, 30, 27, 26, 0 ]
// 5 4 [ 24, 30, 27, 26, 24 ]

// 30
