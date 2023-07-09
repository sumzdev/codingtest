// https://www.acmicpc.net/problem/10809
// 알파벳 찾기

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input.txt";

let str = fs.readFileSync(filePath).toString().trim();

let a = "a".codePointAt(0);

let cnt = new Array(26).fill(0);

// loop: alphabet
for (let alpha in cnt) {
  cnt[alpha] = str.indexOf(String.fromCodePoint(+a + +alpha));
}
console.log(cnt.join(" "));
