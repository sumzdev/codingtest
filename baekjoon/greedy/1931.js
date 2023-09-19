// https://www.acmicpc.net/problem/1931
// 실버 1
// 회의실 배정

const fs = require("fs");

const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      // "./input3.txt",
      // "./input4.txt",
      // "./input5.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [N, ...input] = inputString.trim().split("\n");
  run({ N, input: input.map((v) => v.split(" ").map(Number)) });
}

function run({ N, input }) {
  // console.log(N, input);

  const sortedMeeting = input.sort(([s1, e1], [s2, e2]) =>
    e1 !== e2 ? e1 - e2 : s1 - s2
  );
  // console.log(sortedMeeting);

  // let result = [];
  let cnt = 0;

  let lastTime = 0;

  for (const [startTime, endTime] of sortedMeeting) {
    if (lastTime <= startTime) {
      lastTime = endTime;
      // result.push([startTime, endTime]);
      cnt += 1;
    }
  }
  // console.log(result);
  console.log(cnt);
}
