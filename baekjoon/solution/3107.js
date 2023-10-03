// https://www.acmicpc.net/problem/3107
// 골드 5
// IPv6
// 231003

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 1. 각 그룹의 앞자리의 0의 전체 또는 일부 생략 가능
// 0db8 -> db8
// 0000 -> 0 혹은 00
// 2. 0으로만 이루어져 있는 그룹 -> 한개 이상 연속된 그룹 중 하나를 ::로 바꿀 수 있음 (1번만 가능)

function getFullIPv6(contraction) {
  const addZero = (str) => str.padStart(4, "0");
  const [front2colon, rear2colon] = contraction.split("::");
  if (rear2colon === undefined) {
    // 1) rear2colon === undefined 이면 ::없음
    return front2colon.split(":").map(addZero).join(":");
  } else if (rear2colon === "") {
    // 2) rear2colon === "" 이면 마지막에 ::가 온다.
    const front = front2colon.split(":").map(addZero);
    const rearIpv6 = ":0000".repeat(8 - front.length);
    return front.join(":") + rearIpv6;
  } else if (front2colon === "") {
    // 3) front2colon === "" 이면 처음에 ::가 온다.
    const rear = rear2colon.split(":").map(addZero);
    const frontIpv6 = "0000:".repeat(8 - rear.length);
    return frontIpv6 + rear.join(":");
  }
  // 4) 위 1,2,3이 아니면 중간에 ::가 온다.
  const front = front2colon.split(":").map(addZero);
  const rear = rear2colon.split(":").map(addZero);
  const mid = Array.from({ length: 8 - front.length - rear.length }).fill(
    "0000"
  );
  return [...front, ...mid, ...rear].join(":");
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  // const input = inputString.trim().split("\n");
  console.log(getFullIPv6(inputString.trim()));
}
