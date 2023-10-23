<h1>최단거리(Shortest Path) 구하기</h1>

<h2 id="dijkstra">다익스트라(Dijkstra) 알고리즘</h2>

- 특정 노드에서 다른 노드들 간의 최단거리 구하기
- 그리디 알고리즘 : 가장 적은 비용 노드를 선택하여 임의 과정 반복
- `TODO`

```javascript

```

<h2 id="bellmanford">벨만 포드(Bellman Ford)</h2>

- `TODO`

```javascript

```

<h2 id="floydwarshall">플로이드 워셜(Floyd Warshall)</h2>

- 모든 노드 간의 최간거리 구하기
- 동적 계획법
- 점화식 : `D[i][j] = min(D[i][j], D[i][k] + D[k][j])`

```javascript
/**
 * 플로이드 워셜(Floyd Warshall) - 모든 노드 간의 최단 거리 구하기
 *
 * @param {number} N 노드 개수
 * @param {[number, number][]} streetList 간선 정보 목록
 */
function floydWarshall(N, streetList) {
  const streetTable = Array.from({ length: N + 1 }).map((_) =>
    Array.from({ length: N + 1 }).fill(Number.MAX_SAFE_INTEGER)
  );

  streetList.forEach(([a, b]) => {
    streetTable[a][a] = 0;
    streetTable[b][b] = 0;
    streetTable[a][b] = 1;
    streetTable[b][a] = 1;
  });

  for (let k = 1; k <= N; k++) {
    for (let i = 1; i <= N; i += 1) {
      for (let j = 1; j <= N; j++) {
        if (i === j || i === k || j === k) continue;
        if (streetTable[i][j] > streetTable[i][k] + streetTable[k][j]) {
          streetTable[i][j] = streetTable[i][k] + streetTable[k][j];
        }
      }
    }
  }

  console.log(streetTable);
}
```