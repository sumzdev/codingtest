// https://www.acmicpc.net/problem/11054
// 가장 긴 바이토닉 부분 수열

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input2.txt";

let [N, nums] = fs.readFileSync(filePath).toString().trim().split("\n");
N = +N;
nums = nums.split(" ").map(Number);

let inc = new Array(nums.length).fill(1);
let dec = [...inc];

for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      inc[i] = Math.max(inc[i], inc[j] + 1);
    }

    if (nums[N - j - 1] < nums[N - i - 1]) {
      dec[N - i - 1] = Math.max(dec[N - i - 1], dec[N - j - 1] + 1);
    }
  }
  // console.log("+", inc.join(" "));
  // console.log("-", dec.join(" "));
  // console.log();
}

// console.log(">> +", inc.join(" "));
// console.log(">> -", dec.join(" "));

let max = inc.map((v, i) => v + dec[i]);
console.log(Math.max(...max) - 1);

// inc는 앞에서부터 계산, dec는 뒤에서부터 계산
//  inc  dec (배열 길이 10이라고 가정)
// ----------
// i=1
//  0,1  9,8
// i=2
//  0,2  9,7
//  1,2  8,7
// i=3
//  0,3  9,6
//  1,3  8,6
//  2,3  7,6
// ...

// ins >> [1 2 2 1 3 3 4 5 2 1]
// dec >> [1 5 2 1 4 3 3 3 2 1]
// max >> [6 4 3 5 6 6 7 7 2 1]

// ex) 인덱스 0-4까지 증가, 5-9까지 감소하는 가장 긴 바이토닉 수열 길이는
//     ins[4] + dec[5] = 3+3 = 6-1

// 참고 [T8_DP1_B] P11053 - 가장 긴 증가하는 부분수열
// 참고 [T8_DP1_B] P14002 - 가장 긴 증가하는 부분 수열 4
