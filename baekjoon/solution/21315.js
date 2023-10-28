// https://www.acmicpc.net/problem/21315
// 카드 섞기
// 골드 5
// 완전 탐색, 구현
// 231028
// ---------------------------------------
// 카드 개수 : 3 ≤ N ≤ 1,000
// 카드 숫자 : 1 ≤ num ≤ N
// : 1 ≤ K, 2^K < N
//
// 총 K+1단계
// 1단계 : 밑에서 2^K개 맨위로 올리기
// i(2 ≤ ㅑ ≤ K+1)단계 : 올린 카드 중 밑에서 2^(K-i+1)개 카드를 더미 맨 위로 올리기
// ---------------------------------------
// ex) 첫 shuffle결과 : 5,4,2,3,1
// secondK=1 시도)

// 단계별로 옮길 카드 개수는 2**k에서 2씩 나눈 수 만큼이므로 :
// for (let cntPile = 2 ** secondK; cntPile >= 1; cntPile >>= 1)
//  - ex) k=1인 경우 2, 1
//  - ex) k=2인 경우 4, 2, 1

// 1단계 - [3,1] [5,4,2] => 뒤 5,4,2는 앞으로 변경되지 않는 부분이므로 체크하고 버림
// 2단계 - [1] [3] => 그 다음 3이 오는지 확인
// 마지막으로 시작이 [1]인지 확인
// ---------------------------------------
const fs = require("fs");
// ---------------------------------------
// 시도 1: 시간 초과
// function findShuffleCardK(numOfCards, shuffledCards) {
//   // console.log(numOfCards, shuffledCards);

//   const initialCards = Array.from({ length: numOfCards }, (_, i) => i + 1);

//   const checkEqualCardSet = (shuffledCards, cards) => {
//     return shuffledCards.join("") === cards.join("");
//   };

//   const shuffle = (prevCards, k) => {
//     let cards = [...prevCards];
//     let cardsToUp = cards.splice(numOfCards - 2 ** k);
//     cards = [cardsToUp, cards];
//     // console.log(cards);

//     for (let i = 2; i <= k + 1; i += 1) {
//       const prevCardsToUp = cards.shift();
//       cardsToUp = prevCardsToUp.splice(prevCardsToUp.length - 2 ** (k - i + 1));
//       cards = [cardsToUp, prevCardsToUp, ...cards];
//       // console.log(cards);
//     }

//     cards = cards.flat();
//     // console.log(cards);
//     return cards;
//   };

//   for (let firstK = 1; firstK < numOfCards; firstK += 1) {
//     const cards = shuffle(initialCards, firstK);
//     for (let secondK = 1; secondK < numOfCards; secondK += 1) {
//       const cardsToCheck = shuffle(cards, secondK);
//       if (checkEqualCardSet(shuffledCards, cardsToCheck)) {
//         return `${firstK} ${secondK}`;
//       }
//     }
//   }
// }
// ---------------------------------------
// 시도 2 - 시간초과
// function findShuffleCardK(numOfCards, shuffledCards) {
//   // console.log(numOfCards, shuffledCards);

//   const initialCards = Array.from({ length: numOfCards }, (_, i) => i + 1);

//   const checkEqualCardSet = (shuffledCards, cards) => {
//     for (let i = 0; i < numOfCards; i += 1) {
//       if (shuffledCards[i] !== cards[i]) return false;
//     }
//     return true;
//     // return shuffledCards.join("") === cards.join("");
//   };

//   const shuffle = (prevCards, k) => {
//     let cards = [[...prevCards]];

//     for (let i = 1; i <= k + 1; i += 1) {
//       const prevCardsToUp = cards.pop();
//       const cardsToUp = prevCardsToUp.splice(
//         prevCardsToUp.length - 2 ** (k - i + 1)
//       );
//       cards.push(prevCardsToUp, cardsToUp);
//       // console.log(cards);
//     }

//     cards = cards.reverse().flat();
//     // console.log(cards);
//     return cards;
//   };

//   for (let firstK = 1; firstK < numOfCards; firstK += 1) {
//     // console.log("first", firstK);
//     const cards = shuffle(initialCards, firstK);
//     for (let secondK = 1; secondK < numOfCards; secondK += 1) {
//       // console.log("second", firstK, secondK);
//       const cardsToCheck = shuffle(cards, secondK);
//       if (checkEqualCardSet(shuffledCards, cardsToCheck)) {
//         return `${firstK} ${secondK}`;
//       }
//     }
//   }
// }
// ---------------------------------------
function findShuffleCardK(numOfCards, shuffledCards) {
  // console.log(numOfCards, shuffledCards);

  const initialCards = Array.from({ length: numOfCards }, (_, i) => i + 1);

  const shuffle = (prevCards, k) => {
    let cards = [[...prevCards]];

    for (let i = 1; i <= k + 1; i += 1) {
      const prevCardsToUp = cards.pop();
      const cardsToUp = prevCardsToUp.splice(
        prevCardsToUp.length - 2 ** (k - i + 1)
      );
      cards.push(prevCardsToUp, cardsToUp);
    }

    cards = cards.reverse().flat();
    return cards;
  };

  for (let firstK = 1; firstK < numOfCards; firstK += 1) {
    // console.log("first", firstK);
    const firstShuffledCards = shuffle(initialCards, firstK);

    for (let secondK = 1; secondK < numOfCards; secondK += 1) {
      // console.log("second", firstK, secondK);

      let flag = true;
      let idxToCheck = numOfCards - 1;
      let prevCardsToUp = [...firstShuffledCards];

      for (let cntPile = 2 ** secondK; cntPile >= 1; cntPile >>= 1) {
        const cardsToUp = prevCardsToUp.splice(prevCardsToUp.length - cntPile);
        // console.log(">", i, ":", prevCardsToUp);

        for (let i = prevCardsToUp.length - 1; i >= 0; i -= 1) {
          if (prevCardsToUp[i] !== shuffledCards[idxToCheck]) {
            flag = false;
            break;
          }
          idxToCheck -= 1;
        }
        if (!flag) break;

        prevCardsToUp = cardsToUp;
      }
      if (!flag || prevCardsToUp[0] !== shuffledCards[0]) continue;
      return `${firstK} ${secondK}`;
    }
  }
}
// ---------------------------------------
const isTest = process.platform !== "linux";
const inputFilePaths = !isTest
  ? ["/dev/stdin"]
  : [
      "./input1.txt", //
      // "./input2.txt", //
      // "./input3.txt", //
      // "./input4.txt", //
      // "./input5.txt", //
    ];

for (let filePath of inputFilePaths) {
  if (isTest) console.log("==============", filePath);
  const inputString = fs.readFileSync(filePath).toString();
  const [numOfCards, shuffledCards] = inputString.trim().split("\n");

  console.log(
    findShuffleCardK(+numOfCards, shuffledCards.split(" ").map(Number))
  );
}
