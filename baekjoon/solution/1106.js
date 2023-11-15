// https://www.acmicpc.net/problem/1106
// 호텔
// 골드 5
// DP
// 231115

// ---------------------------------------
// 19 - [3,7], [5,15], [2,3] => 8
// ---------------------------------------
// [3,7]
//   0  3  3  3  3  3  3  3  6  6
//   6  6  6  6  6  9  9  9  9  9
// [5, 15]
//   0  3  3  3  3  3  3  3  5  5
//   5  5  5  5  5  5  8  8  8  8
// [2, 3]
//   0  2  2  2  3  3  3  3  5  5
//   5  5  5  5  5  5  7  7  7  8
// ---------------------------------------
function findMinPrice(targetNumCustomer, priceList) {
  const list = Array(targetNumCustomer + 1).fill(100 * 1000);

  // const test = () => {
  //   console.log(
  //     list
  //       .map((v) => `${v}`.padStart(3, " "))
  //       .reduce((s, c, i) => ((i + 1) % 10 ? s + c : s + c + "\n"), "")
  //   );
  // };

  list[0] = 0;
  const [[price, numCustomer]] = priceList.splice(0, 1);
  for (let idx = 1; idx < list.length; idx += 1) {
    list[idx] = Math.ceil(idx / numCustomer) * price;
  }
  // test();

  for (const [price, numCustomer] of priceList) {
    // console.log(`[${price}, ${numCustomer}]`);
    for (let idx = 0; idx < numCustomer; idx += 1) {
      list[idx] = Math.min(list[idx], price);
    }

    for (let idx = numCustomer; idx < list.length; idx += 1) {
      list[idx] = Math.min(list[idx], list[idx - numCustomer] + price);
      // console.log(idx, list[idx], list[idx - numCustomer], price);
    }
    // test();
  }

  return list[targetNumCustomer];
}
// ---------------------------------------
const fs = require("fs");
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...input] = inputString.trim().split("\n");
  const [targetNum, lengthOfList] = info.split(" ").map(Number);

  console.log(
    findMinPrice(
      targetNum,
      input.map((v) => v.split(" ").map(Number))
    )
  );
}
