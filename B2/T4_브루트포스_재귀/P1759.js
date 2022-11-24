// https://www.acmicpc.net/problem/1759
// 암호 만들기
// 골드 5

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let input = fs.readFileSync(filePath).toString().trim().split("\n");

let [L, _] = input[0].split(" ").map(Number);
let arr = input[1].split(" ");
arr.sort((a, b) => a.localeCompare(b));

let check = arr.map((v) => ["a", "e", "o", "u", "i"].includes(v));
// console.log(arr);

let stack = [];
let res = "";
let cntVowel = 0;
let cntConsonant = 0;
function backtracking(arr, curIdx) {
  if (cntVowel + cntConsonant === L) {
    if (cntVowel >= 1 && cntConsonant >= 2) {
      res += stack.join("") + "\n";
    }
    return;
  }
  for (let idx = curIdx; idx < arr.length; idx++) {
    stack.push(arr[idx]);
    if (check[idx]) {
      cntVowel++;
    } else {
      cntConsonant++;
    }

    backtracking([...arr], idx + 1);

    if (check[idx]) {
      cntVowel--;
    } else {
      cntConsonant--;
    }

    stack.pop();
  }
}
backtracking(arr, 0);
console.log(res.trim());
