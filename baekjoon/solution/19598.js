// https://www.acmicpc.net/problem/19598
// 최소 회의실 개수
// 골드5
// 그리디
// 231116
// ---------------------------------------

function greedyFindMinMeetingRoom(meetingList) {
  // console.log(meetingList);

  // 시작, 종료 시간 순서에 따라 시작(1), 종료(-1)에 해당하는 1차원 배열 생성
  const timeList = meetingList
    .flatMap(([s, e]) => [
      [1, s],
      [-1, e],
    ])
    .sort(([aType, aTime], [bType, bTime]) =>
      aTime !== bTime ? aTime - bTime : aType - bType
    )
    .map(([s, _]) => s);
  // console.log(timeList);

  // 가장 큰 누적 합 구하기
  const [_, maxCnt] = timeList.reduce(
    ([cnt, max], cur) => {
      const curCnt = cnt + cur;
      return [curCnt, Math.max(max, curCnt)];
    },
    [0, 0]
  );

  return maxCnt;
}

// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const input = fs.readFileSync(filePath);
  const [numOfTest, ...inputLine] = input.toString().trim().split("\n");

  console.log(
    greedyFindMinMeetingRoom(inputLine.map((v) => v.split(" ").map(Number)))
  );
}
