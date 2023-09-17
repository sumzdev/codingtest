// https://www.acmicpc.net/problem/10973
// 이전 순열
// 실버 3

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");
let N = +input[0];
let arr = input[1].split(" ").map(Number);

let findIdx = N - 1;
while (arr[findIdx - 1] < arr[findIdx--]);
if (findIdx === -1) {
  console.log(-1);
  return;
}
// console.log(">>", findIdx, arr[findIdx]);

let idx = N;
while (arr[--idx] >= arr[findIdx]);
// console.log(">>", idx, arr[idx]);
[arr[idx], arr[findIdx]] = [arr[findIdx], arr[idx]];
// console.log(arr);

let res = arr.slice(0, findIdx + 1);
res = res.concat([...arr.slice(findIdx + 1)].sort((a, b) => b - a));

console.log(res.join(" "));
