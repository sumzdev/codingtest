// https://www.acmicpc.net/problem/5904
// Moo 게임
// 골드 5
// 분할 정복, 재귀
// 231008

// ---------------------------------------
// 최대 : 1000000000
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 시도 1) 단순 문자열 반복
// - RangeError: Invalid string length
function getNthMooCheck(N) {
  const makeNlenMoo = (i, moo) => {
    // console.log(i, moo);
    if (N <= moo.length) return moo[N - 1];
    const nextMoo = moo + "m" + "o".repeat(i + 3) + moo;
    return makeNlenMoo(i + 1, nextMoo);
  };
  return makeNlenMoo(0, "moo");
}
// ---------------------------------------
// 시도 2) 배열에 3,4,3,5,3,4,3 형식으로 moo에 해당하는 글자 수 저장하는 방식
// - RangeError: Maximum call stack size exceeded
// function getNthMoo(N) {
//   if (N < 3) return "moo"[N];

//   let mooArr = [3];
//   const makeNlenMoo = (remainN, step, prevSum) => {
//     // console.log(">", remainN, step, prevSum, mooArr);
//     if (remainN === 0) return "m";

//     let nextN = remainN - step;
//     if (nextN === 0) return "m";
//     if (nextN < 0) return "o";

//     if (nextN - prevSum < 0) {
//       let remain = prevSum - nextN;
//       // console.log("###", remain, nextN - prevSum, mooArr);
//       for (let moo of mooArr) {
//         remain -= moo;
//         if (remain === 0) return "m";
//         if (remain < 0) return "o";
//       }
//     }
//     mooArr.push(...[step, ...mooArr]);
//     return makeNlenMoo(nextN - prevSum, step + 1, prevSum + step + prevSum);
//   };

//   return makeNlenMoo(N - 3, 4, 3);
// }
// ---------------------------------------
// 시도 3) 재귀적으로 현재 step(moo 길이)에 해당하는 글자 수 빼주는 방식
// 예) step = 5
// [3, 4, 3, 5, 3, 4, 3]
//  ___A___ _B_ ___C___
//
function getNthMoo(N) {
  const makeNlenMoo = (remainN, step, prevSum) => {
    // B 구역
    if (remainN === 1) return "m";
    if (remainN <= step) return "o";
    let nextN = remainN - step;

    if (nextN - prevSum < 0) {
      return makeNlenMoo(nextN, 3, 0);
    }

    return makeNlenMoo(nextN - prevSum, step + 1, prevSum + step + prevSum);
  };

  return makeNlenMoo(N, 3, 0);
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      // "./input1.txt",
      "./input2.txt",
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const N = +inputString.trim();

  // console.log(getNthMoo(1000000000)); // max
  console.log(getNthMoo(N));

  // for (let i = 1; i <= 50; i += 1) {
  //   let check = getNthMooCheck(i);
  //   let res = getNthMoo(i);
  //   console.log("============", i, check, res);
  // }
}

// ---------------------------------------
