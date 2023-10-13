// https://www.acmicpc.net/problem/6588
// 골드바흐의 추측
// 실버 1
// 수학, 정수론, 소수 판정, 에라토스테네스의 체
// 231013

// ---------------------------------------
// 테스트 : 6 = 3 + 3
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 에라토스테네스의 체
const primeList = Array.from({ length: 1000000 }).fill(true);
primeList[0] = false;
primeList[1] = false;

for (let n = 2; n <= 500000; n += 1) {
  for (let multiple = n + n; multiple <= 1000000; multiple += n) {
    primeList[multiple] = false;
  }
}

/**
 * 더해서 num이 되는 두 소수 찾기
 * @param number : num
 * @returns [number, number] : primeNum1, primeNum2
 */
function findTwoPrimeNumbers(num) {
  let cursor = 3;
  while (cursor <= num / 2) {
    if (primeList[cursor] && primeList[num - cursor]) {
      return [cursor, num - cursor];
    }
    cursor += 2;
  }
  return [0, 0];
}

/**
 * @param {number[]} numList
 * 1 <= len <= 100,000
 * 6 ≤ n ≤ 1,000,000 (n은 짝수)
 */
function checkGoldbachConjecture(numList) {
  const result = {
    str: "",
    addPrimeResult(number, primeNum1, primeNum2) {
      result.str += `${number} = ${primeNum1} + ${primeNum2}\n`;
    },
    // addWrong() {
    //   result.str += "Goldbach's conjecture is wrong.\n";
    // },
  };

  for (const num of numList) {
    const [primeNum1, primeNum2] = findTwoPrimeNumbers(num);
    result.addPrimeResult(num, primeNum1, primeNum2);
  }
  return result.str;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const input = inputString.trim().split("\n");
  input.pop(); // 마지막 종료 플래그 "0" 제거
  console.log(checkGoldbachConjecture(input).trim());
}
