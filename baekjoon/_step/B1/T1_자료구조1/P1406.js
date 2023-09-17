// https://www.acmicpc.net/problem/1406
// 에디터 (스택 문제)

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";

// string array
let lineInput = fs.readFileSync(filePath).toString().trim().split("\n");
let [str, , ...cmds] = lineInput;

let strArr = [...str];
let restArr = [];

cmds.forEach((cmd) => {
  switch (cmd[0]) {
    case "L":
      if (strArr.length > 0) restArr.push(strArr.pop());
      break;
    case "D":
      if (restArr.length > 0) strArr.push(restArr.pop());
      break;
    case "B":
      if (strArr.length > 0) strArr.pop();
      break;
    case "P":
      strArr.push(cmd.at(-1));
  }
});

console.log(strArr.concat(restArr.reverse()).join(""));
