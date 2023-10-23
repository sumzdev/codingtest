# Shortest Path(최단 거리)

## 정리

<a href="./shortest_path.md">최단거리 구하기</a>

- <a href="./shortest_path.md#bfs">BFS</a>
- <a href="./shortest_path.md#dijkstra">다익스트라(Dijkstra) 알고리즘</a>
- <a href="./shortest_path.md#bellmanford">벨만 포드(Bellman Ford)</a>
- <a href="./shortest_path.md#floydwarshall">플로이드 워셜(Floyd Warshall)</a>

## 문제 목록

[출처](https://github.com/tony9402/baekjoon/tree/main/shortest_path)
| 완료 | 순번 | 추천 문제 | 문제 번호(문제 링크) | 문제 이름 (풀이 링크) | 난이도 | 태그 |
| :-----: | :-----: | :-----: | :-----: | :-----: | :-----: | :-----: |
| ✅ | 00 |v| <a href="https://www.acmicpc.net/problem/18352" target="_blank">18352</a> | <a href="../solution/18352.js" target="_blank">특정 거리의 도시 찾기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/9.svg"/> | |
| ⬜️ | 01 |v| <a href="https://www.acmicpc.net/problem/11403" target="_blank">11403</a> | <a href="../solution/11403.js" target="_blank">경로 찾기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/10.svg"/> | |
| ⬜️ | 02 |v| <a href="https://www.acmicpc.net/problem/13549" target="_blank">13549</a> | <a href="../solution/13549.js" target="_blank">숨바꼭질 3</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 03 |v| <a href="https://www.acmicpc.net/problem/11265" target="_blank">11265</a> | <a href="../solution/11265.js" target="_blank">끝나지 않는 파티</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 04 |v| <a href="https://www.acmicpc.net/problem/1753" target="_blank">1753</a> | <a href="../solution/1753.js" target="_blank">최단경로</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 05 |v| <a href="https://www.acmicpc.net/problem/14938" target="_blank">14938</a> | <a href="../solution/14938.js" target="_blank">서강그라운드</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 06 |v| <a href="https://www.acmicpc.net/problem/1277" target="_blank">1277</a> | <a href="../solution/1277.js" target="_blank">발전소 설치</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 07 |v| <a href="https://www.acmicpc.net/problem/2224" target="_blank">2224</a> | <a href="../solution/2224.js" target="_blank">명제 증명</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 08 |v| <a href="https://www.acmicpc.net/problem/11404" target="_blank">11404</a> | <a href="../solution/11404.js" target="_blank">플로이드</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 09 |v| <a href="https://www.acmicpc.net/problem/1956" target="_blank">1956</a> | <a href="../solution/1956.js" target="_blank">운동</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 10 |v| <a href="https://www.acmicpc.net/problem/10159" target="_blank">10159</a> | <a href="../solution/10159.js" target="_blank">저울</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 11 |v| <a href="https://www.acmicpc.net/problem/11657" target="_blank">11657</a> | <a href="../solution/11657.js" target="_blank">타임머신</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 12 |v| <a href="https://www.acmicpc.net/problem/22865" target="_blank">22865</a> | <a href="../solution/22865.js" target="_blank">가장 먼 곳</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 13 |v| <a href="https://www.acmicpc.net/problem/1719" target="_blank">1719</a> | <a href="../solution/1719.js" target="_blank">택배</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 14 |v| <a href="https://www.acmicpc.net/problem/1238" target="_blank">1238</a> | <a href="../solution/1238.js" target="_blank">파티</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 15 |v| <a href="https://www.acmicpc.net/problem/1613" target="_blank">1613</a> | <a href="../solution/1613.js" target="_blank">역사</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 16 |v| <a href="https://www.acmicpc.net/problem/1865" target="_blank">1865</a> | <a href="../solution/1865.js" target="_blank">웜홀</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 17 |v| <a href="https://www.acmicpc.net/problem/1507" target="_blank">1507</a> | <a href="../solution/1507.js" target="_blank">궁금한 민호</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 18 | | <a href="https://www.acmicpc.net/problem/1058" target="_blank">1058</a> | <a href="../solution/1058.js" target="_blank">친구</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/9.svg"/> | |
| ⬜️ | 19 | | <a href="https://www.acmicpc.net/problem/1446" target="_blank">1446</a> | <a href="../solution/1446.js" target="_blank">지름길</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/10.svg"/> | |
| ⬜️ | 20 | | <a href="https://www.acmicpc.net/problem/18243" target="_blank">18243</a> | <a href="../solution/18243.js" target="_blank">Small World Network</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/10.svg"/> | |
| ⬜️ | 21 | | <a href="https://www.acmicpc.net/problem/1389" target="_blank">1389</a> | <a href="../solution/1389.js" target="_blank">케빈 베이컨의 6단계 법칙</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/10.svg"/> | |
| ⬜️ | 22 | | <a href="https://www.acmicpc.net/problem/15723" target="_blank">15723</a> | <a href="../solution/15723.js" target="_blank">n단 논법</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/10.svg"/> | |
| ⬜️ | 23 | | <a href="https://www.acmicpc.net/problem/1916" target="_blank">1916</a> | <a href="../solution/1916.js" target="_blank">최소비용 구하기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 24 | | <a href="https://www.acmicpc.net/problem/17396" target="_blank">17396</a> | <a href="../solution/17396.js" target="_blank">백도어</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 25 | | <a href="https://www.acmicpc.net/problem/5972" target="_blank">5972</a> | <a href="../solution/5972.js" target="_blank">택배 배송</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 26 | | <a href="https://www.acmicpc.net/problem/14284" target="_blank">14284</a> | <a href="../solution/14284.js" target="_blank">간선 이어가기 2</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 27 | | <a href="https://www.acmicpc.net/problem/20168" target="_blank">20168</a> | <a href="../solution/20168.js" target="_blank">골목 대장 호석 - 기능성</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 28 | | <a href="https://www.acmicpc.net/problem/9205" target="_blank">9205</a> | <a href="../solution/9205.js" target="_blank">맥주 마시면서 걸어가기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 29 | | <a href="https://www.acmicpc.net/problem/2660" target="_blank">2660</a> | <a href="../solution/2660.js" target="_blank">회장뽑기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/11.svg"/> | |
| ⬜️ | 30 | | <a href="https://www.acmicpc.net/problem/13424" target="_blank">13424</a> | <a href="../solution/13424.js" target="_blank">비밀 모임</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 31 | | <a href="https://www.acmicpc.net/problem/1261" target="_blank">1261</a> | <a href="../solution/1261.js" target="_blank">알고스팟</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 32 | | <a href="https://www.acmicpc.net/problem/1504" target="_blank">1504</a> | <a href="../solution/1504.js" target="_blank">특정한 최단 경로</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 33 | | <a href="https://www.acmicpc.net/problem/4485" target="_blank">4485</a> | <a href="../solution/4485.js" target="_blank">녹색 옷 입은 애가 젤다지?</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 34 | | <a href="https://www.acmicpc.net/problem/10282" target="_blank">10282</a> | <a href="../solution/10282.js" target="_blank">해킹</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 35 | | <a href="https://www.acmicpc.net/problem/18223" target="_blank">18223</a> | <a href="../solution/18223.js" target="_blank">민준이와 마산 그리고 건우</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 36 | | <a href="https://www.acmicpc.net/problem/20007" target="_blank">20007</a> | <a href="../solution/20007.js" target="_blank">떡 돌리기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 37 | | <a href="https://www.acmicpc.net/problem/2458" target="_blank">2458</a> | <a href="../solution/2458.js" target="_blank">키 순서</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 38 | | <a href="https://www.acmicpc.net/problem/21940" target="_blank">21940</a> | <a href="../solution/21940.js" target="_blank">가운데에서 만나기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/12.svg"/> | |
| ⬜️ | 39 | | <a href="https://www.acmicpc.net/problem/20182" target="_blank">20182</a> | <a href="../solution/20182.js" target="_blank">골목 대장 호석 - 효율성 1</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 40 | | <a href="https://www.acmicpc.net/problem/11779" target="_blank">11779</a> | <a href="../solution/11779.js" target="_blank">최소비용 구하기 2</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 41 | | <a href="https://www.acmicpc.net/problem/11562" target="_blank">11562</a> | <a href="../solution/11562.js" target="_blank">백양로 브레이크</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/13.svg"/> | |
| ⬜️ | 42 | | <a href="https://www.acmicpc.net/problem/20183" target="_blank">20183</a> | <a href="../solution/20183.js" target="_blank">골목 대장 호석 - 효율성 2</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 43 | | <a href="https://www.acmicpc.net/problem/13911" target="_blank">13911</a> | <a href="../solution/13911.js" target="_blank">집 구하기</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 44 | | <a href="https://www.acmicpc.net/problem/2982" target="_blank">2982</a> | <a href="../solution/2982.js" target="_blank">국왕의 방문</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 45 | | <a href="https://www.acmicpc.net/problem/9370" target="_blank">9370</a> | <a href="../solution/9370.js" target="_blank">미확인 도착지</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 46 | | <a href="https://www.acmicpc.net/problem/2211" target="_blank">2211</a> | <a href="../solution/2211.js" target="_blank">네트워크 복구</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 47 | | <a href="https://www.acmicpc.net/problem/1445" target="_blank">1445</a> | <a href="../solution/1445.js" target="_blank">일요일 아침의 데이트</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 48 | | <a href="https://www.acmicpc.net/problem/11780" target="_blank">11780</a> | <a href="../solution/11780.js" target="_blank">플로이드 2</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/14.svg"/> | |
| ⬜️ | 49 | | <a href="https://www.acmicpc.net/problem/16118" target="_blank">16118</a> | <a href="../solution/16118.js" target="_blank">달빛 여우</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/15.svg"/> | |
| ⬜️ | 50 | | <a href="https://www.acmicpc.net/problem/2307" target="_blank">2307</a> | <a href="../solution/2307.js" target="_blank">도로검문</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/15.svg"/> | |
| ⬜️ | 51 | | <a href="https://www.acmicpc.net/problem/1219" target="_blank">1219</a> | <a href="../solution/1219.js" target="_blank">오민식의 고민</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/16.svg"/> | |
| ⬜️ | 52 | | <a href="https://www.acmicpc.net/problem/22870" target="_blank">22870</a> | <a href="../solution/22870.js" target="_blank">산책 (large)</a> | <img height="25px" width="25px" src="https://static.solved.ac/tier_small/16.svg"/> | |
