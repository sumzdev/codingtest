// https://www.acmicpc.net/problem/15650
// N과 M (2)
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let [N, M] = fs.readFileSync(filePath).toString().trim().split(" ").map(Number);

let numArr = new Array(N).fill(0).map((_, i) => i + 1);
// console.log(numArr, M);

let res = permutation(numArr, M);
res.forEach((v) => console.log(...v));

function permutation(array, num) {
  const result = [];
  if (num == 1) {
    return array.map((v) => [v]);
  }

  array.forEach((val, idx, arr) => {
    // 기존 순열 (15649.js)
    // const comb = permutation(
    //   arr.slice(0, idx).concat(arr.slice(idx + 1)), // 이 부분만 변경
    //   num - 1
    // );
    const comb = permutation(arr.slice(idx + 1), num - 1);
    result.push(...comb.map((elem) => [val, ...elem]));
  });
  return result;
}
