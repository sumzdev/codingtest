// https://www.acmicpc.net/problem/17413
// 단어 뒤집기 2
const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let line = fs.readFileSync(filePath).toString().trim();

function solution(line) {
  let res = "";
  let idx = 0;
  let tmp = "";
  while (idx < line.length) {
    switch (line[idx]) {
      case "<":
        if (tmp != "") {
          res += [...tmp].reverse().join("");
          tmp = "";
        }
        let tagEndIdx = line.indexOf(">", idx);
        res += line.substring(idx, tagEndIdx + 1);
        idx = tagEndIdx + 1;
        continue;
      case " ":
        res += [...tmp].reverse().join("") + " ";
        tmp = "";
        break;
      default:
        tmp += line[idx];
        break;
    }
    idx++;
  }
  if (tmp != "") res += [...tmp].reverse().join("");
  console.log(res);
}

solution(line);
