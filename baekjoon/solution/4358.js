// https://www.acmicpc.net/problem/4358
// 실버 2
// 생태학
// 230924

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function printPercent(num, sum) {
  // 소수점 4자리까지 출력
  return ((num / sum) * 100).toFixed(4);
}

function sortAndCalcPercent(strList, total) {
  let res = "";
  Object.keys(strList)
    .sort()
    .forEach(
      (species) =>
        (res += `${species} ${printPercent(strList[species], total)}\n`)
    );
  return res.trim();
}

const strList = {};
let cnt = 0;

rl.on("line", (inputLine) => {
  if (inputLine === "") rl.close();

  strList[inputLine] = strList[inputLine] ? strList[inputLine] + 1 : 1;
  cnt += 1;
}).on("close", function () {
  // console.log(strList);
  console.log(sortAndCalcPercent(strList, cnt));
  process.exit();
});
