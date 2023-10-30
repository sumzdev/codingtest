// https://www.acmicpc.net/problem/15961
// 회전 초밥
// 골드 4
// 슬라이딩 윈도우
// 231030
// ---------------------------------------
// 회전 초밥 음식점의 벨트 상태
// 회전 초밥 벨트에 놓인 접시의 수 N : 2 ≤ N ≤ 3,000,000
// 메뉴에 있는 초밥의 가짓수 : 2 ≤ d ≤ 3,000
// 연속해서 먹는 접시의 개수 : 2 ≤ k ≤ 3,000 (k ≤ N)
// 쿠폰 번호 : 1 ≤ c ≤ d
// 초밥 벨트에 놓인 초밥 목록 : 1 이상 d 이하
// 손님이 먹을 수 있는 초밥 가짓수의 최댓값 구하기
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------

function findMaxSushiType(
  numOfPlates,
  numOfSushiType,
  k,
  couponType,
  sushiList
) {
  // console.log(numOfPlates, numOfSushiType, k, couponType, sushiList);

  const cntSushiPickType = {
    list: Array(numOfSushiType + 1).fill(0),
    countType() {
      return this.list.filter((v) => v > 0).length;
    },
    checkIncludeCouponType() {
      return this.list[couponType] > 0;
    },
  };

  let idx = 0;
  let pickIdx = 0;
  while (pickIdx < k) {
    cntSushiPickType.list[sushiList[pickIdx++]] += 1;
  }
  pickIdx = pickIdx < numOfPlates ? pickIdx : 0;

  let cntType = cntSushiPickType.countType();
  let maxType = cntType + (cntSushiPickType.checkIncludeCouponType() ? 0 : 1);

  idx += 1;

  for (; idx < numOfPlates; idx += 1) {
    if (sushiList[idx - 1] !== sushiList[pickIdx]) {
      cntSushiPickType.list[sushiList[idx - 1]] -= 1;
      cntSushiPickType.list[sushiList[pickIdx]] += 1;

      if (cntSushiPickType.list[sushiList[idx - 1]] === 0) {
        cntType -= 1;
      }
      if (cntSushiPickType.list[sushiList[pickIdx]] === 1) {
        cntType += 1;
      }
      maxType = Math.max(
        maxType,
        cntType + (cntSushiPickType.checkIncludeCouponType() ? 0 : 1)
      );
      if (maxType === k + 1) break;
    }

    pickIdx = pickIdx + 1 < numOfPlates ? pickIdx + 1 : 0;
  }
  return maxType;
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      "./input2.txt", //
      "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [info, ...sushiList] = inputString.trim().split("\n");
  const [numOfPlates, numOfSushiType, k, couponType] = info
    .split(" ")
    .map(Number);

  console.log(
    findMaxSushiType(
      numOfPlates,
      numOfSushiType,
      k,
      couponType,
      sushiList.map(Number)
    )
  );
}
