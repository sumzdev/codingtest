// https://www.acmicpc.net/problem/15649
// N과 M (1)
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
    const comb = permutation(
      arr.slice(0, idx).concat(arr.slice(idx + 1)),
      num - 1
    );
    result.push(...comb.map((elem) => [val, ...elem]));
  });
  return result;
}
