// https://www.acmicpc.net/problem/9020
// 골드바흐의 추측
// 실버 2
// 수학, 정수론, 소수 판정, 에라토스테네스의 체
// 231013

// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 에라토스테네스의 체
const primeList = Array.from({ length: 10000 }).fill(true);
primeList[0] = false;
primeList[1] = false;

for (let n = 2; n <= 5000; n += 1) {
  for (let multiple = n + n; multiple <= 10000; multiple += n) {
    primeList[multiple] = false;
  }
}

/**
 * 더해서 num이 되는 두 소수 찾기
 * @param number : num
 * @returns [number, number] : primeNum1, primeNum2
 */
function findTwoPrimeNumbers(num) {
  let cursor = num >> 1;
  let twoPrimeNumbers = [0, 0];
  while (cursor > 0) {
    if (primeList[cursor] && primeList[num - cursor]) {
      twoPrimeNumbers = [cursor, num - cursor];
      break;
    }
    cursor -= 1;
  }
  return twoPrimeNumbers;
}

/**
 * @param {number[]} numList
 * 1 <= len <= 100,000
 * 6 ≤ n ≤ 1,000,000 (n은 짝수)
 */
function checkGoldbachConjecture(numList) {
  const result = {
    str: "",
    addPrimeResult(primeNum1, primeNum2) {
      result.str += `${primeNum1} ${primeNum2}\n`;
    },
  };

  for (const num of numList) {
    const [primeNum1, primeNum2] = findTwoPrimeNumbers(num);
    result.addPrimeResult(primeNum1, primeNum2);
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
  const [N, ...input] = inputString.trim().split("\n");
  console.log(checkGoldbachConjecture(input.map(Number)).trim());
}
