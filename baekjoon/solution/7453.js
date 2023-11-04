// https://www.acmicpc.net/problem/7453
// 합이 0인 네 정수
// 골드 2
// 투 포인터, 이분 탐색
// 231104
// ---------------------------------------
// 1 ≤ n ≤ 4000
// - (2**28) ≤ Xi ≤ 2**28
// ---------------------------------------
// ******* Test
// N 400으로 테스트
// - map 이용 Hash : 25.686ms
// - object 이용 Hash : 83.22ms
// - twoPointer : 78.139ms
// - bruteforce : 31.320s

// function random() {
//   return parseInt(Math.random() * 2 ** 28 * 2 - 2 ** 28);
// }

// const numList = [];
// for (let abcd = 0; abcd < 4; abcd += 1) {
//   const row = [];
//   for (let i = 0; i < 400; i += 1) {
//     row.push(random());
//   }
//   numList.push(row);
// }

// console.time("hashMap");
// getCntSumZero(400, numList);
// console.timeEnd("hashMap"); // hashMap: 25.686ms

// console.time("hashObject");
// hashObject(400, numList);
// console.timeEnd("hashObject"); // hashObject: 83.22ms

// console.time("twoPointer");
// twoPointer(400, numList);
// console.timeEnd("twoPointer"); // twoPointer: 78.139ms

// console.time("bruteforce");
// bruteforce(400, numList);
// console.timeEnd("bruteforce"); // bruteforce: 31.320s

// ---------------------------------------
// bruteforce - 정답 확인용
function bruteforce(lenOfList, [a, b, c, d]) {
  let cnt = 0;

  for (const ai of a) {
    for (const bi of b) {
      const ab = ai + bi;
      for (const ci of c) {
        const abc = ab + ci;
        for (const di of d) {
          if (!(abc + di)) {
            cnt += 1;
          }
        }
      }
    }
  }

  return cnt;
}
// ---------------------------------------
// two pointer - 시간 초과
function twoPointer(lenOfList, [a, b, c, d]) {
  const ascendingOrderCompareFn = (a, b) => a - b;

  const ab = [];
  const cd = [];
  for (let i = 0; i < lenOfList; i += 1) {
    for (let j = 0; j < lenOfList; j += 1) {
      ab.push(a[i] + b[j]);
      cd.push(c[i] + d[j]);
    }
  }
  ab.sort(ascendingOrderCompareFn);
  cd.sort(ascendingOrderCompareFn);

  let cnt = 0;
  let abIdx = 0;
  let cdIdx = cd.length - 1;

  while (abIdx < ab.length && cdIdx >= 0) {
    const sum = ab[abIdx] + cd[cdIdx];
    if (sum > 0) {
      cdIdx -= 1;
    } else if (sum < 0) {
      abIdx += 1;
    } else {
      const targetABIdx = abIdx;
      while (ab[++abIdx] === ab[targetABIdx]);
      const targetCDIdx = cdIdx;
      while (cd[--cdIdx] === cd[targetCDIdx]);

      cnt += (abIdx - targetABIdx) * (targetCDIdx - cdIdx);
    }
  }

  return cnt;
}
// ---------------------------------------
// hash - object 사용 - 시간 초과
function hashObject(lenOfList, [a, b, c, d]) {
  const cd = {};
  for (const ci of c) {
    for (const di of d) {
      const sumCD = (ci + di) * -1;
      if (cd[sumCD]) cd[sumCD] += 1;
      else cd[sumCD] = 1;
    }
  }

  let cnt = 0;

  for (const ai of a) {
    for (const bi of b) {
      const v = ai + bi;
      if (cd[v]) cnt += cd[v];
    }
  }
  return cnt;
}
// ---------------------------------------
// hash - Map 사용 (pass)
function getCntSumZero(lenOfList, [a, b, c, d]) {
  const cd = new Map();
  for (const ci of c) {
    for (const di of d) {
      const sumCD = (ci + di) * -1;
      cd.set(sumCD, cd.has(sumCD) ? cd.get(sumCD) + 1 : 1);
    }
  }

  let cnt = 0;

  for (const ai of a) {
    for (const bi of b) {
      const v = ai + bi;
      if (cd.has(v)) cnt += cd.get(v);
    }
  }
  return cnt;
}
// ---------------------------------------
// const fs = require("fs");
// const isTest = process.platform !== "linux";
// const inputFilePaths = !isTest
//   ? ["/dev/stdin"]
//   : [
//       "./input1.txt", // 5
//       // "./input2.txt", //
//     ];

// for (let filePath of inputFilePaths) {
//   if (isTest) console.log("==============", filePath);
//   const inputString = fs.readFileSync(filePath).toString();
//   const [info, ...list] = inputString.trim().split("\n");

//   const numList = [[], [], [], []];
//   list.forEach((v) =>
//     v
//       .split(" ")
//       .map(Number)
//       .forEach((v, i) => numList[i].push(v))
//   );

//   // console.log(bruteforce(+info, numList));
//   console.log(getCntSumZero(+info, numList));
// }
// ---------------------------------------
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("", (inputLine) => {
  // 첫 줄
  const N = +inputLine;
  const abcd = [[], [], [], []];

  rl.on("line", (inputLine) => {
    if (inputLine === "") rl.close();

    inputLine
      .split(" ")
      .map(Number)
      .forEach((v, i) => abcd[i].push(v));
  }).on("close", function () {
    console.log(getCntSumZero(N, abcd));
    process.exit();
  });
});
