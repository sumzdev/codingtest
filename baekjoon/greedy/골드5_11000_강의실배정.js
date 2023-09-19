// https://www.acmicpc.net/problem/11000
// 골드 5
// 강의실 배정

// 동시간에 진행되는 강의 수 최대 값 구하기
//
// 3
// 1 3
// 2 4
// 3 5
//
// ["s", 1], ["e", 3]
// ["s", 2], ["e", 4]
// ["s", 3], ["e", 5]
// ------------ sort
// ["s", 1] => [1, 1]
// ["s", 2] => [1, 2]
// ["e", 3] => [-1, 3]
// ["s", 3] => [1, 3]
// ["e", 4] => [-1, 4]
// ["e", 5] => [-1, 5]
// >>
// s : +1 / e : -1 => 중간 최대 숫자 구하기
// [1, 1, -1, 1, -1, -1]
// [1, 2, 1, 2, 1, 0] => 2

// 추가 테스트 - https://www.acmicpc.net/board/view/110871
// 추가 테스트 - https://www.acmicpc.net/board/view/41689
// 3
// 3 4
// 2 3
// 1 2

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      "./input3.txt",
      "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");
  run({ N, input: input.map((v) => v.split(" ").map(Number)) });
}

function run({ N, input }) {
  const timeList = input
    .flatMap(([s, e]) => [
      [1, s],
      [-1, e],
    ])
    .sort(([type1, time1], [type2, time2]) =>
      time1 !== time2 ? time1 - time2 : type1 - type2
    )
    .map(([s, _]) => s);
  // console.log(timeList);

  const maxCnt = timeList.reduce(
    ([cnt, max], cur) => {
      const curCnt = cnt + cur;
      return [curCnt, Math.max(max, curCnt)];
    },
    [0, 0]
  );
  console.log(maxCnt[1]);
}
