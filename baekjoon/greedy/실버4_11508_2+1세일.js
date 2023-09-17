// https://www.acmicpc.net/problem/11508
// 실버 4
// 2+1 세일

// [런타임에러] -- fs -> readline

// const fs = require("fs");

// const isTest = process.platform !== "linux";
// const inputFilePaths = !isTest
//   ? ["/dev/stdin"]
//   : [
//       "./input1.txt",
//       "./input2.txt",
//       "./input3.txt",
//       "./input4.txt",
//       // "./input5.txt",
//     ];

// for (let filePath of inputFilePaths) {
//   if (isTest) console.log("==============", filePath);
//   const inputString = fs.readFileSync(filePath).toString();
//   const [N, ...input] = inputString.trim().split("\n");

//   run({ N, input: input.map((v) => +v) });
// }

// [메모리 초과]
// function sum(arr) {
//   return arr.reduce((total, cur) => total + cur, 0);
// }

// function run({ N, input }) {
//   // console.log(input);
//   if (N < 3) {
//     console.log(sum(input));
//     return;
//   }

//   let total = 0;
//   let priceList = input.sort((a, b) => b - a);
//   let p1, p2, p3;
//   // console.log(priceList);

//   while (priceList.length >= 3) {
//     [p1, p2, p3, ...priceList] = priceList;
//     total += p1 + p2;
//   }
//   console.log(sum([total, ...priceList]));
// }

// // -------------------------
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let inputLine = [];

rl.on("line", (line) => {
  inputLine.push(line);
}).on("close", function () {
  function solution({ N, inputList: inputArr }) {
    const sum = (arr) => arr.reduce((total, cur) => total + cur, 0);

    if (N < 3) {
      console.log(sum(inputArr));
      return;
    } else {
      let total = 0;
      const priceList = inputArr.map(Number).sort((a, b) => b - a);
      // console.log(priceList);

      for (let i = 0; i < priceList.length; i++) {
        if (i % 3 !== 2) {
          total += priceList[i];
        }
      }
      console.log(total);
      return;
    }
  }

  const [N, ...inputList] = inputLine;
  solution({ N: +N, inputList: inputList.map((v) => +v) });

  process.exit();
});
