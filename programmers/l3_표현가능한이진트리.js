// 프로그래머스
// https://school.programmers.co.kr/learn/courses/30/lessons/150367?language=javascript
// 2023 2023 KAKAO BLIND RECRUITMENT
// 표현 가능한 이진트리
// Lv.3

const nums = [7, 42, 5, 63, 111, 95, 128]; // 1,1,0,1,1,0
console.log(main(nums));

function main(nums) {
  return nums.map(isBinaryTree);
}

function isBinaryTree(num) {
  if (num === 1) return 1;

  // --------------------------------------------------------
  // 숫자 -> 이진수 -> 의 길이 -> 를 이진수 -> 의 길이(=Depth) | 2**(Depth)
  // 3 -> 11 -> 2 -> 10 -> 2 | 4
  // 4 -> 100 -> 3 -> 11 -> 2 | 4
  // 5 -> 101 -> 3 -> 11 -> 2 | 4
  // 7 -> 111 -> 3 -> 11 -> 2 | 4
  // 8 -> 1000 -> 4 -> 100 -> 3 | 8
  // 15 -> 1111 -> 4 -> 100 -> 3 | 8
  // 16 -> 10000 -> 5 -> 101 -> 3 | 8
  // 32 -> 100000 -> 6 -> 110 -> 3 | 8
  // 63 -> 111111 -> 6 -> 110 -> 3 | 8
  // 64 -> 1000000 -> 7 -> 111 -> 3 | 8
  // 128 -> 10000000 -> 8 -> 1000 -> 4 | 16

  // 이 마지막(2 ** N)에서 1을 뺀 수가 숫자를 포화이진트리로 만들었을 때 노드의 개수
  // --------------------------------------------------------

  const binaryTree = num.toString(2).split("").map(Number);
  // console.log(binaryTree);

  // (#1) 포화이진트리 depth와 총 노드 수 구하기
  const depth = binaryTree.length.toString(2).length;
  const treeLen = 2 ** depth - 1;

  // (#2) 포화이진트리(perfectBinaryTree) 만들기
  const pbTree = Array(treeLen - binaryTree.length)
    .fill(0)
    .concat(binaryTree);
  // console.log("포화이진트리 : ", perfectBinaryTree);

  // (#3) 루트가 1이 아니면 -> 이진트리로 표현 불가
  if (pbTree[treeLen >> 1] !== 1) return 0;

  // (#4) 자식 노드 중 하나라도 1이 있으면 부모 노드는 1이어야 함
  for (let level = 0; level < depth - 1; level += 1) {
    const startIdx = 2 ** level - 1;
    const numToAdd = 2 ** (level + 2);
    for (let i = startIdx; i < treeLen; i += numToAdd) {
      const j = i + 2 ** (level + 1);
      const idx = (i + j) >> 1;

      // t[i], t[j] 중 하나라도 1이 있으면 t[idx]는 1이어야 함.
      if (pbTree[i] | pbTree[j] && !pbTree[idx]) return 0;
    }
  }

  return 1;
}

// (#4) 자식 노드 중 하나라도 1이 있으면 부모 노드는 1이어야 함

//            7
//       3          11
//    1     5     9    13
//   0  2  4  6  8 10 12 14

// 각 i[idx]j
// 각 i 값과 j 값 중 하나라도 1이 있으면 부모 노드 값은 1이어야 함

// ---- level 0
// 0[1]2, 4[5]6, 8[9]10, 12[13]14
// - $i
// 시작 0 = (2 ** level - 1)
// 4씩 증가 = (2 ** (level + 2))
// treeLen 이전까지
// - $j: i+2 = i + (2 ** (level + 1))
//
// ---- level 1
// 1[3]5, 9[11]13
// - $i
// 시작 1 (2 ** level - 1),
// 8씩 증가 = (2 ** (level + 2))
// treeLen 이전까지
// - $j: i+4 = i + (2 ** (level + 1))
//
// ---- level < depth - 1 까지
// ---- level 2 -- (#3)에서 루트 값 1인지 확인했으므로 체크 안함
// 3[7]11
