// https://www.acmicpc.net/problem/20291
// 실버 3
// 파일 정리
// 230922

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("", (inputLine) => {
  const N = +inputLine;
  const extensionObj = {};

  rl.on("line", (inputLine) => {
    if (inputLine === "") rl.close();

    const extension = inputLine.split(".")[1];
    extensionObj[extension] = extensionObj[extension]
      ? extensionObj[extension] + 1
      : 1;
  }).on("close", function () {
    let result = "";
    Object.keys(extensionObj)
      .sort()
      .forEach(
        (extension) => (result += `${extension} ${extensionObj[extension]}\n`)
      );
    console.log(result.trim());
    process.exit();
  });
});
