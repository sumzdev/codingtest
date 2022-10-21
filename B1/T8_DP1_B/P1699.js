// https://www.acmicpc.net/problem/1699
// 제곱수의 합

const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "./input3.txt";

let num = +fs.readFileSync(filePath).toString().trim();

let squareNums = [0, 1];
for (let n = 1; n ** 2 <= num; n++) squareNums.push(n ** 2);

let comb = [];
for (let i = 0; i <= num; i++) comb.push(i);

for (let i = 1; i <= num; i++) {
  // console.log("\n>>>", i);
  for (let j = 1; j * j <= i; j++) {
    // console.log(j, comb[i], i - j * j, comb[i - j * j] + 1);

    comb[i] = Math.min(comb[i], comb[i - j * j] + 1);
  }
}

console.log(comb[num]);

/** 설명

>>> 1
j=1 comb[1]=1, comb[1-1]+1 =0+1 =1 
=> 1

>>> 2
j=1 comb[2]=2, comb[2-1]+1 =1+1 =2
=> 2

>>> 3
1 3 2 3
j=1 comb[3]=3, comb[3-1]+1 =2+1 =3
=> 3

>>> 4
j=1 comb[4]=4, comb[4-1]+1 =3+1 =4 
j=2 comb[4]=4, comb[4-4]+1 =0+1 =1  
=> 1

>>> 5
j=1 comb[5]=5, comb[5-1]+1 =comb[4]+1 =1+1 =2
j=2 comb[5]=2, comb[5-4]+1 =comb[1]+1 =1+1 =2
=> 2

------- 
comb = [
  0,1,2,3,1,2,
  3,4,2,1,2,
  3,...
]

>>> 12
j=1 comb[12]=12, comb[12-1]+1 = comb[11]+1 = 3+1 =4
j=2 comb[12]=4, comb[12-4]+1 = comb[8]+1 =2+1 =3
j=3 comb[12]=3, comb[12-9]+1 = comb[3]+1 =3+1 =4
=> 2
 */
