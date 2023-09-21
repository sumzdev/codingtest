<h1>활동 선택 문제</h1>

목차

- <a href="#select1">(1) 한 번에 가장 많은 활동을 할 수 있는 경우 고르기</a>
- <a href="#select2">(2) 모든 활동을 포함 하는 최소 그룹 개수</a>

<h2 id="select1">활동 선택 문제 (1)</h2>

한 번에 가장 많은 활동을 할 수 있는 경우 고르기

| index |  1  |  2  |  3  |  4  |  5  |
| :---: | :-: | :-: | :-: | :-: | :-: |
| start |  1  |  2  |  5  |  6  |  8  |
|  end  |  3  |  4  |  7  |  9  |  9  |

|  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  |
| :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: | :-: |
|     |  2  |  2  |  2  |     |  4  |  4  |  4  |  4  |
|  1  |  1  |  1  |     |  3  |  3  |  3  |  5  |  5  |

-> 1, 3, 5가 가장 많은 활동하는 경우

```javascript
const sorted = input.sort(([s1, e1], [s2, e2]) =>
  e1 !== e2 ? e1 - e2 : s1 - s2
);

let result = [];
let lastTIme = 0;

for (const [startTime, endTime] of sorted) {
  if (lastTime <= startTime) {
    lastTime = endTime;
    result.push([startTime, endTime]);
  }
}
```

- 실버1 - 1931 - 회의실 배정

---

<h2 id="select2">활동 선택 문제 (2)</h2>

모든 활동을 포함 하는 최소 그룹 개수

```javascript
const timeList = input
  .flatMap(([s, e]) => [
    [1, s],
    [-1, e],
  ])
  .sort(([type1, time1], [type2, time2]) =>
    time1 !== time2 ? time1 - time2 : type1 - type2
  )
  .map(([s, _]) => s);
// console.log(timeList);

const maxCnt = timeList.reduce(
  ([cnt, max], cur) => {
    const curCnt = cnt + cur;
    return [curCnt, Math.max(max, curCnt)];
  },
  [0, 0]
);
console.log(maxCnt[1]);
```

- 골드5 - 11000 - 강의실 배정
