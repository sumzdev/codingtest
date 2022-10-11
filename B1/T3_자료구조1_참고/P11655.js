// https://www.acmicpc.net/problem/11655
// ROT13

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let line = fs.readFileSync(filePath).toString();

let a = "a".codePointAt(0);
let A = "A".codePointAt(0);

let res = "";

for (let char of [...line]) {
  if (char.match(/[a-z]/g)) {
    let unicode = ((char.codePointAt(0) - a + 13) % 26) + a;
    res += String.fromCodePoint(unicode);
  } else if (char.match(/[A-Z]/g)) {
    let unicode = ((char.codePointAt(0) - A + 13) % 26) + A;
    res += String.fromCodePoint(unicode);
  } else {
    res += char;
  }
}
console.log(res);
