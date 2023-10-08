// https://www.acmicpc.net/problem/2417
// 정수 제곱근
// 실버 4
// 수학, 이분 탐색
// 231008

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
const binarySearchFunc = (startNum, endNum, target, prev) => {
  // 배열에 해당 값이 존재하지 않는 경우
  if (startNum > endNum) {
    return `${startNum}`;
  }

  // 중간 값 구하기
  const midNum = (startNum + endNum) >> 1n;
  const squareNum = midNum ** 2n;

  // 찾은 경우
  if (squareNum === target) {
    return `${midNum}`;
  }

  // 중간 값 보다 큰 경우
  if (squareNum < target) {
    return binarySearchFunc(midNum + 1n, endNum, target, 1);
  }

  // 중간 값 보다 작은 경우
  return binarySearchFunc(startNum, midNum - 1n, target, -1);
};
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt",
      "./input2.txt",
      // "./input3.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const N = +inputString.trim();

  // 시도 1) Math 내장 객체 이용
  // MAX_SAFE_INTEGER : 2^53 - 1 => 범위 초과
  // let sqrt = Math.sqrt(N);
  // if (`${sqrt}`.includes(".")) {
  //   sqrt = Math.floor(sqrt) + 1;
  // }
  // console.log(sqrt);

  console.log(binarySearchFunc(0n, BigInt(N), BigInt(N)));
}

// ---------------------------------------
