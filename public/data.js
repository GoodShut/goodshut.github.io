const CONTENTS = [
  {videoId: 'Vwj1bacaAPY'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_LL']
  ,armylink: 'u5x7-3x28-1x23-1x17-22x5-2x6-7x10-2x82-2x1s2x2-4x5-1x9-2x11'},
  {videoId: '-J8yZ6-WhZE'
  ,tags: ['TH_14', 'LO_SQ', 'ST_QH', 'ST_DR']},
  {videoId: 'jcDPKtUzB6M'
  ,tags: ['TH_14', 'LO_SQ', 'ST_QH', 'ST_DR']},
  {videoId: 'HfaoAFYwp-A'
  ,tags: ['TH_12', 'LO_AS', 'ST_QH', 'ST_LL']},
  {videoId: 'd8TebZajtQs'
  ,tags: ['TH_14', 'LO_AS', 'ST_QH', 'ST_DR']},
  {videoId: 'GFMgaiAKHTA'
  ,tags: ['TH_12', 'LO_PZ', 'ST_QH', 'ST_HM']
  ,armylink: 'u5x7-16x24-9x11-3x28-2x23-2x5-2x6-2x1-1x3s2x2-2x5-2x1-1x9'},
  {videoId: '6_zB3wzgSg8'
  ,tags: ['TH_12', 'LO_AS', 'ST_QH', 'ST_HM']
  ,armylink: 'u5x7-16x24-9x11-3x28-3x5-2x23-2x6-2x1s2x2-2x5-2x1-1x9'},
  {videoId: 'FsWpjNhqo10'
  ,tags: ['TH_11', 'LO_SM', 'ST_QH', 'ST_HM']},
  {videoId: 'fQ7josN2sJ0'
  ,tags: ['TH_11', 'LO_SM', 'ST_QH', 'ST_HM']},
  {videoId: 'OnhT3dXxPZI'
  ,tags: ['TH_11', 'LO_IL', 'ST_QH', 'ST_HM']
  ,armylink: 'u5x7-14x24-10x11-6x4-4x5-2x23-1x6s2x2-2x5-2x1-1x9'},
  {videoId: 'hQ0DQizff0o'
  ,tags: ['TH_11', 'LO_AS', 'ST_QH', 'ST_HM']
  ,armylink: 'u5x7-13x24-10x11-8x4-4x5-4x6-1x23s1x2-1x3-2x1-2x5-1x9'},
  {videoId: 'y5XY-QzF0bI'
  ,tags: ['TH_12', 'LO_SM', 'ST_QH', 'ST_HM']},
  {videoId: 'jac94Ri9Epw'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_HM']
  ,comment: '섬진형 시작부분 참고'},
  {videoId: 'wsVtNdKHRjs'
  ,tags: ['TH_12', 'LO_PZ', 'ST_QH', 'ST_HM']
  ,comment: '퀸 진행방향 확인 후 반대쪽을 킹+시즈훈련소로 정리하고 본대로 중앙돌파'},
  {videoId: 'd-pBrDDVH04'
  ,tags: ['TH_14', 'LO_SQ', 'ST_QH', 'ST_DR']},
  {videoId: 'oHei61La_sE'
  ,tags: ['TH_12', 'LO_PZ', 'ST_QH', 'ST_HM']},
  {videoId: 'k8hX9jIpiPQ'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_LL']},
  {videoId: 'zrPL8b36CL8'
  ,tags: ['TH_12', 'LO_SM', 'ST_QH', 'ST_LL']},
  {videoId: 'jESASs6ml_4'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_HM']},
  {videoId: 'JHvO_issWHs'
  ,tags: ['TH_13', 'LO_PZ', 'ST_SM', 'ST_OS']
  ,comment: '광장형 센터홀 파훼법- 8지진 골통발'},
  {videoId: 'Y6mhMQMwMFQ'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'WLJ8aTljm3k'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'Cc9GvBnaJoQ'
  ,tags: ['TH_12', 'LO_SM', 'ST_QH', 'ST_HM']},
  {videoId: 'agRPf1_hweo'
  ,tags: ['TH_12', 'LO_SM', 'ST_QH', 'ST_HM']},
  {videoId: 'MoWGtbNDPaE'
  ,tags: ['TH_14', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'EI9_pcldOuY'
  ,tags: ['TH_12', 'LO_SM', 'ST_QH', 'ST_HM']
  ,comment: '퀸힐로 외곽을 훑다가 독수리타워 향해 돌파, 킹+시즈훈련소로 외곽정리. 이후 본대투입'},
  {videoId: 'p4tNO5uBKFI'
  ,tags: ['TH_12', 'LO_PZ', 'ST_QH', 'ST_HM']
  ,comment: '퀸힐로 한쪽 외곽을 훑고, 반대편을 킹+시즈훈련소로 정리. 본대로 중앙돌파'},
  {videoId: 'hiMBNe8kjIw'
  ,tags: ['TH_12', 'LO_PZ', 'ST_QH', 'ST_HM']},
  {videoId: 'wc7Nvfqm7vo'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'PVTXJhnEo0g'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_HM']},
  {videoId: 'VDZ60HQNT7c'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'X-wEgVZXKXU'
  ,tags: ['TH_14', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'fVmOftQLZsA'
  ,tags: ['TH_14', 'ST_OS']},
  {videoId: 'yv583TW0I2s'
  ,tags: ['TH_14', 'LO_SQ', 'ST_QH', 'ST_DR']},
  {videoId: 'RwneKGNM9kQ'
  ,tags: ['TH_14', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'O2A9eHNLFzY'
  ,tags: ['TH_14', 'LO_SM', 'ST_DG', 'ST_DR', 'ST_CL']},
  {videoId: 'GOdshDlQhCE'
  ,tags: ['TH_14', 'LO_SM', 'ST_DG', 'ST_DR']},
  {videoId: 'y7ElqbK3yLc'
  ,tags: ['TH_14', 'LO_SM', 'ST_DG', 'ST_DR']},
  {videoId: '1tqynCtwN6w'
  ,tags: ['TH_14', 'LO_SM', 'ST_IV', 'ST_SM', 'ST_LL']},
  {videoId: 'Gy2C5SUvd-g'
  ,tags: ['TH_12', 'LO_PZ', 'ST_QH', 'ST_LL']},
  {videoId: 'uSiFZPKFSKo'
  ,tags: ['TH_14', 'ST_CL', 'ST_DR', 'ST_DG', 'ST_OS']},
  {videoId: 'NuXmVKZk-4c'
  ,tags: ['TH_14', 'LO_IL', 'ST_QH', 'ST_DR']},
  {videoId: 'l8cqOFExZRQ'
  ,tags: ['TH_13', 'LO_SQ', 'ST_QH', 'ST_DR']},
  {videoId: 'thZtKXnAMP0'
  ,tags: ['TH_12', 'LO_AS', 'ST_QH', 'ST_LL']},
  {videoId: 'Qppx2hoC56Y'
  ,tags: ['TH_14', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'ttpv8_t4UiQ'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'EEDox5OPqs8'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'zETjKQx-qMQ'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: '0Xs-nkRLVFY'
  ,tags: ['TH_13', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: 'gRIC1-ps8GA'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_LL']},
  {videoId: '5esnoy-wb6Y'
  ,tags: ['TH_14', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'HS8AGZK23gE'
  ,tags: ['TH_13', 'LO_SM', 'ST_QH', 'ST_DR']},
  {videoId: '5rDD99NsEFY'
  ,tags: ['TH_13', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'kDQJjTgJ5cA'
  ,tags: ['TH_14', 'LO_SM', 'ST_QH', 'ST_DR', 'ST_TR']},
  {videoId: 'G20tvKEB0sE'
  ,tags: ['TH_12', 'LO_SM', 'ST_QH', 'ST_LL']},
  {videoId: 'unc-kaFfv9Q'
  ,tags: ['TH_13', 'LO_PZ', 'ST_QH', 'ST_DR']},
  {videoId: 'mf3efASc-F0'
  ,tags: ['TH_14', 'LO_IL', 'ST_CL', 'ST_DG', 'ST_DR']},
  {videoId: '7hCfXjRTA58'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_LL']},
  {videoId: 'LuhzYk2GSX0'
  ,tags: ['TH_12', 'LO_IL', 'ST_QH', 'ST_LL']},
  {videoId: 'liSeQta5GYU'
  ,tags: ['TH_14', 'LO_SQ', 'ST_QH', 'ST_DR']}
];
