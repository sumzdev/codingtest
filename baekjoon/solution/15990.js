// https://www.acmicpc.net/problem/15990
// 1, 2, 3 더하기 5

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [_, ...nums] = fs
  .readFileSync(filePath)
  .toString()
  .trim()
  .split("\n")
  .map(Number);

let max = Math.max(...nums);

let arr = [
  0,
  [1, 0, 0], // 1
  [0, 1, 0], // 2
  [1, 1, 1], // 3
];
// 1,2,3 더하기로 (연속되지 않게) 3 만드는 경우의 수
// 2 + 1 {1:1}
// 1 + 2 {2:1}
// 3 {3:1}
// => {1:1, 2:1, 3:1} =>[1,1,1]

for (let n = 4; n <= max; n++) {
  arr[n] = [
    (arr[n - 1][1] + arr[n - 1][2]) % 1000000009,
    (arr[n - 2][0] + arr[n - 2][2]) % 1000000009,
    (arr[n - 3][0] + arr[n - 3][1]) % 1000000009,
  ];
}

for (let num of nums) {
  console.log(arr[num].reduce((sum, v) => sum + v, 0) % 1000000009);
}
