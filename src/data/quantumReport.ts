import { ExhibitionReportDoc } from "@/types/report";

export const quantumExpoReport: ExhibitionReportDoc = {
  id: "report-quantum-expo-2026",
  updatedAt: "2026-09-25",
  cover: {
    title: "국제양자산업대전 (QX KOREA 2026)",
    subtitle: "글로벌 양자컴퓨팅 상용화 현주소와 포스트 퀀텀 암호(PQC) 전환 대응 전략",
    dateRange: "2026.09.09(수) – 09.11(금)",
    location: "서울 코엑스 (COEX) Hall B (B2)",
    department: "전략기획팀 / 미래기술연구소",
    author: "박상준 책임연구원",
    publisher: "비즈니스 참관 결과 보고서",
    issueDate: "2026.09",
    contactEmail: "quantum-strategy@company.com",
    website: "quantumexpo.co.kr",
  },
  ch01: {
    eventName: "국제양자산업대전 (Quantum Expo Korea 2026 / QX KOREA 2026)",
    dates: "2026.09.09(수) ~ 09.11(금), 3일간",
    location: "서울 코엑스(COEX) Hall B (Hall B2 구역)",
    edition: "국내 최대 민간 주도 양자산업 전문 B2B 비즈니스 전시회",
    host: "한국양자산업협회(KQIA), 미래양자융합포럼(FQCF), 양자신문, 제이엑스포(J·EXPO)",
    organizer: "제이엑스포(J·EXPO)",
    supporters: "과학기술정보통신부, 서울특별시",
    metrics: [
      {
        label: "참가사 및 기관",
        value: "12개국 85개사",
        growthBadge: "+45.8%↑",
        subText: "Quantinuum, 노르마, 드림시큐리티 등 글로벌 빅테크 및 산학연 참가",
      },
      {
        label: "전시 부스 규모",
        value: "210개 부스",
        growthBadge: "+38.5%↑",
        subText: "COEX Hall B 전관 활용, 대형 독립 부스 및 기술 시연존 대폭 확충",
      },
      {
        label: "전문 참관객 수",
        value: "12,000명 이상",
        growthBadge: "역대 최대↑",
        subText: "산·학·연 의사결정권자, 글로벌 투자사, 엔지니어 대거 방문",
      },
      {
        label: "전문 컨퍼런스",
        value: "42개 세션",
        subText: "글로벌 양자 서밋, IR 피칭데이, 참가업체 기술세미나 3일간 동시 진행",
      },
    ],
    sourceNote:
      "출처: QX KOREA 2026 공식 현장 쇼가이드(SHOW GUIDE), 공식 홈페이지(quantumexpo.co.kr), 주최기관(KQIA) 공식 집계 종합",
    noteCallout: {
      title: "💡 헷갈리기 쉬운 점 — 퀀텀 코리아 vs 국제양자산업대전 비교",
      content:
        "매년 6월 과학기술정보통신부가 주최하는 '퀀텀 코리아(Quantum KOREA)'는 정부 주도의 학술·연구·정책 중심 행사입니다. 반면 본 '국제양자산업대전(QX KOREA)'은 한국양자산업협회 등 민간 기관이 주최하여 실제 상용화 솔루션, 비즈니스 매칭, IR 투자 유치에 집중하는 산업 플랫폼 전시회입니다. 본 보고서는 당사 비즈니스 연계성 관점에서 실전 적용 방안을 집중 분석했습니다.",
    },
    sketches: [
      {
        id: "qs1-1",
        photoUrl:
          "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80",
        caption: "코엑스 Hall B 전시장 입구 — 국제양자산업대전 공식 게이트와 등록 데스크",
      },
      {
        id: "qs1-2",
        photoUrl:
          "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&auto=format&fit=crop&q=80",
        caption: "메인 스테이지 — 2026 글로벌 양자 서밋 개회식 및 키노트 세션 전경",
      },
      {
        id: "qs1-3",
        photoUrl:
          "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&auto=format&fit=crop&q=80",
        caption: "Quantinuum 플래티넘 스폰서 부스 앞 최신 H2 프로세서 설명을 경청하는 인파",
      },
      {
        id: "qs1-4",
        photoUrl:
          "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80",
        caption: "노르마(NORMA) 부스 — QLLM 활용 신물질 개발 및 PQC 마이그레이션 라이브 데모",
      },
    ],
  },
  ch02: {
    zoneSummary:
      "전시장은 COEX Hall B를 3대 핵심 구역으로 나누어 효율적으로 배치되었습니다: ① 글로벌 메인 스폰서 및 대기업 독립부스존 (Quantinuum, 노르마, 드림시큐리티, 탈레스, IDQ), ② 혁신 양자 SW·소재 및 유관 연구기관존 (큐노바, ETRI, KRISS, NIMS, ZURIQ, CAS Cold Atom), ③ 메인 스테이지 및 B2B 매칭·IR 라운지. 3일 동안 기술 발표와 비즈니스 미팅이 상시 유기적으로 진행되었습니다.",
    days: [
      {
        id: "qd-1",
        dayLabel: "Day 1 (9/9 수)",
        theme: "2026 글로벌 양자 서밋 & 산업 유즈케이스 세션",
        sessions: [
          "[개회식 & 키노트] 한국양자산업협회 김성혁 회장 개회사 / Quantinuum Marvin Lee 대표 'From Research to Reality (양자 연구에서 상용 현실로)'",
          "[산업 적용 사례 1] 노르마 정현철 대표: 'QLLM(양자 거대언어모델)을 활용한 신물질 개발 사례 및 시뮬레이션'",
          "[산업 적용 사례 2] IBM Quantum 표창희 상무: '양자컴퓨팅의 글로벌 산업 적용 사례와 엔터프라이즈 비즈니스 기회'",
          "[산업 적용 사례 3] 바오밥에이바이오 노경태 대표: '바이오·신약개발과 양자컴퓨팅 융합 알고리즘'",
          "[스폰서 전문 세션] Quantinuum Thomas Soini (기술 혁신에서 산업 임팩트로) / 드림시큐리티 장형도 이사 (양자 시대 사용자 인증) / 큐노바 김재현 부사장 / 오리엔텀 Renaud / 아이디퀀티크 엄상윤 대표 (지속가능 양자보안-IonQ)",
        ],
      },
      {
        id: "qd-2",
        dayLabel: "Day 2 (9/10 목)",
        theme: "글로벌 퀀텀 AI 경진대회 시상식 & 양자테크 IR 피칭데이",
        sessions: [
          "[오전] 제3회 글로벌 퀀텀 AI 경진대회 시상식: 산학연 45개 팀 중 양자 알고리즘 기반 금융·물류 최적화 우수 솔루션 수상작 발표",
          "[오후 키노트] Q AI Ventures James Sanders 투자 총괄: '글로벌 양자 테크 투자 Trend 및 VC 펀딩 동향'",
          "[IR 피칭 세션 1~3] 지큐티코리아(GQT KOREA), 옵티큐랩스(OptiQ Labs), 인세레브로(InCerebro)의 핵심 원천기술 발표",
          "[IR 피칭 세션 4~6] 엠버스(MVERSE), 브라이트퀀텀(Bright Quantum), 퀀텀인텔리전스(Quantum Intelligence)의 상용 비즈니스 모델 발표",
          "[투자 심사 및 네트워킹] IBK벤처투자, 캡스톤, 퓨처플레이, 신한벤처투자 등 전문 VC 심사위원단 1:1 투자 연계",
        ],
      },
      {
        id: "qd-3",
        dayLabel: "Day 3 (9/11 금)",
        theme: "글로벌 양자산업 생태계 및 기업 트렌드 포럼",
        sessions: [
          "[오프닝 & 국가 세션] 미래양자융합포럼 김효실 센터장 / 캐나다 Quantum Industry Canada / 주한 네덜란드 대사관 / 주한 호주 대사관의 국가별 양자 육성 전략 공유",
          "[차세대 아키텍처 발표] 스위스 ZURIQ Dr. Pavel Hrmo: 'Going 2D - 트랩이온 양자컴퓨팅의 차세대 2차원 마이크로 트랩 어레이 확장'",
          "[제조 및 공정 적용] 중국 HUAYI BOAO QUANTUM: '이온트랩 양자컴퓨팅의 산업화 경로와 반도체 패키징 연계'",
          "[중성원자 기술] CAS COLD ATOM Dr. Ge Guiguo: '200큐비트 듀얼코어 중성원자 양자컴퓨터 HanYuan-2 엔지니어링'",
          "[상시 기술세미나] ETRI(양자기술 미래방향), KRISS(NV 다이아몬드 센서), 탈레스(PQC 마이그레이션), 국가수리과학연구소(암호전환)",
        ],
      },
    ],
    b2bSummary:
      "3일간 전시 기간 동안 총 480여 건의 공식 1:1 비즈니스 매칭 및 기술 제휴 상담이 체결되었습니다. 특히 2026-2030 정부 의무화가 가시화된 '양자내성암호(PQC) 마이그레이션'과 '신약/신소재 양자 가속 알고리즘' 분야에 국내 대기업 및 금융·방산 기관의 상담 수요가 집중되었습니다.",
    sketches: [
      {
        id: "qs2-1",
        photoUrl:
          "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&auto=format&fit=crop&q=80",
        caption: "Quantinuum Marvin Lee 대표의 글로벌 양자 서밋 키노트 발표 현장",
      },
      {
        id: "qs2-2",
        photoUrl:
          "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80",
        caption: "메인 스테이지에서 열린 양자테크 IR 피칭데이 참가 스타트업 발표",
      },
      {
        id: "qs2-3",
        photoUrl:
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80",
        caption: "탈레스(Thales) 코리아 부스에서 진행된 PQC 보안 모듈 시연 및 기술 상담",
      },
      {
        id: "qs2-4",
        photoUrl:
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=80",
        caption: "비즈니스 라운지에서 진행된 글로벌 기업과 국내 산·학·연 1:1 파트너링 미팅",
      },
    ],
  },
  ch03: {
    intro:
      "현장 부스 배치도 및 85개 참가사 명단을 정밀 분석하여, 글로벌 양자 기술 밸류체인을 8대 핵심 기술 및 산업 분야로 분류·매핑했습니다. 하드웨어부터 소프트웨어, 보안, 부품 소재에 이르는 생태계 지형도를 한눈에 파악할 수 있도록 정리했습니다.",
    fields: [
      {
        id: "qf-1",
        category: "01. 양자컴퓨팅 하드웨어 (Hardware)",
        companies: "Quantinuum, IBM Quantum, CAS COLD ATOM, ZURIQ, HUAYI BOAO QUANTUM, K-QBT",
      },
      {
        id: "qf-2",
        category: "02. 양자 소프트웨어 & 플랫폼 (Software)",
        companies: "큐노바(Qunova Computing), AWS, Classiq, Qnami, 로우파트너스(ROWE), U-CUBE",
      },
      {
        id: "qf-3",
        category: "03. 양자통신 & 네트워크 (Communication)",
        companies: "ID Quantique(아이디퀀티크), SKL, Q-UBIC, KT, 한국전자통신연구원(ETRI), 충북양자연구센터",
      },
      {
        id: "qf-4",
        category: "04. 양자 보안 & 암호 (PQC Security)",
        companies: "노르마(NORMA), 드림시큐리티, 탈레스 코리아(Thales), 국가수리과학연구소(NIMS)",
      },
      {
        id: "qf-5",
        category: "05. 양자 센싱 & 정밀계측 (Sensors)",
        companies: "한국표준과학연구원(KRISS), SDT, OptiQ Labs, SensorView, EYL, BaseStone, OTS",
      },
      {
        id: "qf-6",
        category: "06. 극저온 장비 & 제어 디바이스 (Devices)",
        companies: "삼보에드텍(Tabor), 라이모션(Limotion), 블루포스(Bluefors), VA-Tech, QZTECH",
      },
      {
        id: "qf-7",
        category: "07. 광학·소재 & 나노가공 (Materials)",
        companies: "나노팹(NanoFab), 케이포토닉스(K2 Photonics), 제올(JEOL), Carl Zeiss, Bristol Instruments",
      },
      {
        id: "qf-8",
        category: "08. 산업 응용 & 융합 (Convergence)",
        companies: "바오밥에이바이오, 오리엔텀(Orientom), 인세레브로(InCerebro), 퀀텀인텔리전스, 연세양자이니셔티브",
      },
    ],
    source: "출처: QX KOREA 2026 공식 현장 가이드북 'Booth Layout & Exhibitor List' 기반 분류",
  },
  ch04: {
    intro:
      "전시 참가 85개 기업 중 기술 성숙도, 특허 경쟁력, 시장 점유율, 그리고 당사의 보안 인프라 및 신기술 도입 연계 가치가 매우 높은 10개 핵심 기업을 엄선하여 심층 분석을 실시했습니다.",
    companies: [
      {
        id: "qc-1",
        name: "Quantinuum (부스 A107)",
        profile:
          "Honeywell의 이온트랩 하드웨어와 Cambridge Quantum의 양자 컴파일러 소프트웨어가 결합된 세계 최대 독립 양자컴퓨팅 기업. H1 및 차세대 H2 프로세서를 기반으로 전 세계 최고 수준의 양자 볼륨(Quantum Volume)을 기록하고 있음.",
        whyPick:
          "물리적 큐비트의 오차율을 극한으로 낮추고 실용적 논리 큐비트(Logical Qubit) 구현에 가장 앞서 있음. 2026-2027 결함 허용(Fault-Tolerant) 상용 시스템 런칭을 예고하여 글로벌 양자 클라우드 벤치마킹 1순위 대상임.",
        source: "공식 홈페이지(quantinuum.com) 및 Marvin Lee 대표 키노트 발표",
      },
      {
        id: "qc-2",
        name: "NORMA / 노르마 (부스 A103)",
        profile:
          "국내 양자보안 및 소프트웨어 분야를 선도하는 기술 기업. 양자내성암호(PQC) 마이그레이션 프레임워크와 양자 역학 알고리즘을 결합한 산업용 LLM 플랫폼 'Q-Platform'을 자체 개발하여 상용 공급 중.",
        whyPick:
          "기존 금융·공공 레거시 시스템의 암호체계를 무중단으로 PQC로 전환하는 진단·변환 툴을 확보. 이번 전시에서 발표한 QLLM 활용 배터리 신소재 분자 구조 탐색 실증은 제조업 R&D 공정 단축의 강력한 레퍼런스임.",
        source: "부스 현장 라이브 데모 및 정현철 대표 발표 세션",
      },
      {
        id: "qc-3",
        name: "Qunova Computing / 큐노바 (부스 B120)",
        profile:
          "양자 화학 계산 및 신약·신소재 분자 시뮬레이션 알고리즘 전문 소프트웨어 스타트업. 특정 양자 컴퓨터에 종속되지 않고 IBM, Quantinuum 등 다종 QPU에서 구동되는 플랫폼 독립형 클라우드 솔루션 제공.",
        whyPick:
          "기존 슈퍼컴퓨터로 수주일 소요되던 고정밀 분자 바닥상태 에너지를 고전-양자 하이브리드 알고리즘으로 수시간 내 계산. 분자 크기 확장에 따른 지수적 복잡도를 효과적으로 제어하여 실질적 ROI 창출 가능.",
        source: "김재현 총괄 부사장 세미나 및 기술 브로슈어",
      },
      {
        id: "qc-4",
        name: "드림시큐리티 / Dream Security (부스 B107)",
        profile:
          "국내 대표 암호 인증 보안 전문기업으로, 제로트러스트 보안 체계와 양자난수발생기(QRNG), 양자내성암호(PQC)를 결합한 통합 인증 보안 아키텍처를 전방위 구축.",
        whyPick:
          "클라우드 접속 인증과 엔터프라이즈 SSO 환경에 즉시 적용 가능한 하이브리드 PQC 모듈을 완성. 향후 사내 포털 및 고객사 인증 게이트웨이의 보안 규제 준수를 위한 즉시 도입 검토 대상.",
        source: "장형도 이사 세미나 발표 및 부스 인터뷰",
      },
      {
        id: "qc-5",
        name: "ID Quantique / 아이디퀀티크 (부스 D122)",
        profile:
          "스위스 제네바 소재의 세계적인 양자통신 원천기술 기업으로, 초소형 양자난수발생(QRNG) 칩과 장거리 양자키분배(QKD) 네트워크 솔루션을 전 세계 통신사 및 데이터센터에 공급.",
        whyPick:
          "모바일 칩셋 레벨까지 소형화된 하드웨어 보안 칩과 IonQ 하드웨어 연계 양자 보안 솔루션을 제시. 데이터센터 간 백본 전송망의 스누핑(도청)을 물리적으로 차단하는 최고의 인프라 신뢰성 보유.",
        source: "엄상윤 대표 전문 강연 및 쇼케이스 데모",
      },
      {
        id: "qc-6",
        name: "Thales Korea / 탈레스 코리아 (부스 B103)",
        profile:
          "글로벌 방산·우주항공 및 사이버보안 대기업으로, 전 세계 금융 및 공공 인프라를 지탱하는 하드웨어 보안 모듈(Luna HSM) 시장 점유율 1위 기업.",
        whyPick:
          "미국 NIST의 표준 PQC 알고리즘(ML-KEM, ML-DSA)을 펌웨어 레벨에서 지원하는 차세대 HSM 장비를 전시. 금융권 결제망 및 공공 전산망 마이그레이션 시 하드웨어 교체 표준 규격으로 채택 필수.",
        source: "조재웅 이사 'PQC 마이그레이션' 기술세미나 발표자료",
      },
      {
        id: "qc-7",
        name: "ZURIQ (부스 B112)",
        profile:
          "스위스 취리히 연방공대(ETH Zurich) 스핀오프 기업으로, 1차원 선형 구조에 머물던 기존 이온트랩 방식을 2차원 마이크로 셔플링 트랩 어레이 기술로 혁신한 차세대 양자컴퓨터 제조사.",
        whyPick:
          "큐비트 수가 늘어날 때 발생하는 결맞음 시간 저하와 이온 정렬 한계를 2D 그리드 평면 구조로 극복. 서버실 랙마운트 형태로 설치 가능한 소형 고집적 양자 컴퓨터 상용화 로드맵 보유.",
        source: "Dr. Pavel Hrmo 글로벌 포럼 발표",
      },
      {
        id: "qc-8",
        name: "CAS COLD ATOM (부스 C116)",
        profile:
          "중국과학원 산하의 중성원자(Neutral Atom) 전문 양자컴퓨팅 기업. 레이저 광격자 트랩 기술을 활용하여 극저온 희석냉동기 없이도 200큐비트 규모의 HanYuan-2 듀얼코어 시스템을 구축.",
        whyPick:
          "초전도 방식 대비 유지보수 비용이 현저히 저렴하며, 물류 및 금융 포트폴리오 최적화(QUBO) 문제에서 기존 고전 컴퓨터 대비 압도적인 연산 속도 개선을 실증함.",
        source: "Dr. Ge Guiguo 제품 총괄 세미나 세션",
      },
      {
        id: "qc-9",
        name: "삼보에드텍 / Tabor Electronics (부스 D116)",
        profile:
          "글로벌 계측기 명가 Tabor Electronics의 한국 공식 파트너사로, 큐비트 조작을 위한 초고속 임의파형발생기(AWG) 및 Direct-to-RF 신호 제어 솔루션 공급.",
        whyPick:
          "외부 주파수 믹서 장비 없이 단일 모듈에서 마이크로웨이브 RF 신호를 직접 생성하여 큐비트 제어실의 배선과 노이즈를 80% 이상 획기적으로 줄이는 Proteus 시리즈 시연.",
        source: "Mark Elo 최고제품책임자(CPO) 기술 강연",
      },
      {
        id: "qc-10",
        name: "SDT / 에스디티 (부스 B114)",
        profile:
          "국내 정부 K-양자 플래그십 사업의 핵심 주관사이자 정밀 제어 계측 시스템 전문기업. 초전도 및 중성원자 QPU를 정밀 구동하는 국산 제어 드라이버 및 시간측정기(TDC)를 자체 제작.",
        whyPick:
          "외산 장비에 전적으로 의존하던 양자컴퓨터 제어 보드를 성공적으로 국산화하여 시스템 구축 비용을 40% 이상 절감. 국내 양자 클러스터 구축의 핵심 공급망으로 부상.",
        source: "부스 현장 실기 시연 및 엔지니어 상담",
      },
    ],
  },
  ch05: {
    intro:
      "QX KOREA 2026의 42개 발표 세션과 주요 부스 현장 인터뷰를 심층 종합한 결과, 2026년은 양자 기술이 이론적 연구실(Lab) 단계를 벗어나 글로벌 산업 현장에서 실질적인 경제적 가치를 창출하는 '양자 상용화(Quantum Commercialization)의 원년'으로 확고히 자리매김했음을 확인했습니다.",
    trends: [
      {
        id: "qt-1",
        number: "01",
        title: "고전 HPC와 양자컴퓨팅의 하이브리드 가속 연산 체제 확립",
        content:
          "양자 컴퓨터가 고전 컴퓨터를 일시에 전면 대체할 것이라는 과거의 관측과 달리, 엔터프라이즈 환경에서는 고전 CPU/GPU 슈퍼컴퓨터가 전체 워크로드를 통제하고 특정 지수적 복잡도를 가진 난제 영역만 QPU가 가속 처리하는 'HPC-Quantum Hybrid' 구조가 글로벌 사실상 표준(de-facto standard)으로 확립되었습니다.",
        factCheck: {
          title: "현장 팩트체크",
          content:
            "일부 해외 스타트업이 순수 양자 단독 연산을 과시하기도 하나, Quantinuum, IBM, 노르마 등 실제 글로벌 상용 서비스를 제공하는 메이저 기업들은 100% 고전 가속기와 큐비트를 유기적으로 엮은 하이브리드 파이프라인으로 실증을 진행하고 있습니다.",
        },
        source: "IBM Quantum 세션 및 Quantinuum 기술 로드맵 발표",
      },
      {
        id: "qt-2",
        number: "02",
        title: "2026-2030 양자내성암호(PQC) 전환 의무화와 레거시 보안 재편",
        content:
          "미국 NIST의 PQC 공식 표준(FIPS 203/204/205) 제정 완료에 따라, 2026년부터 전 세계 금융·통신·공공 기관의 레거시 RSA/ECC 암호 전환이 강제 규제로 발효되기 시작했습니다. 특히 적대 세력이 현재 암호화된 기밀 데이터를 무단 수집해 두었다가 미래 양자컴퓨터로 일괄 해독하는 '지금 수집하고 나중에 해독(SNDL)' 위협에 대응하기 위한 선제적 PQC 마이그레이션 수요가 폭발하고 있습니다.",
        factCheck: {
          title: "현장 팩트체크",
          content:
            "수백만 개에 달하는 엔터프라이즈 서버의 암호 알고리즘을 단번에 교체하는 것은 불가능합니다. 따라서 탈레스 및 드림시큐리티 현장 상담에서는 레거시 시스템 위에 PQC 래퍼를 씌워 단계적으로 호환성을 확보하는 '크립토 어질리티(Crypto-Agility)' 아키텍처가 현실적 대안으로 제시되었습니다.",
        },
        source: "탈레스 코리아 및 국가수리과학연구소(NIMS) 기술세미나",
      },
      {
        id: "qt-3",
        number: "03",
        title: "QLLM 및 양자 화학 알고리즘을 통한 신약·배터리 R&D 혁신",
        content:
          "제조·바이오 산업계에서는 양자의 중첩과 얽힘 특성을 직접 반영하여 복잡한 분자 오비탈을 계산하는 양자 화학 알고리즘이 실효성을 입증하고 있습니다. 노르마의 QLLM 및 큐노바의 분자 시뮬레이션을 통해 이차전지 전해질 신물질 탐색 및 신약 후보물질 도출 주기가 기존 수년 단위에서 수개월 단위로 80% 이상 단축되는 성과가 확인되었습니다.",
        factCheck: {
          title: "현장 팩트체크",
          content:
            "현재의 수백 큐비트 수준(NISQ)으로는 완전한 단백질 전체 구조를 한 번에 시뮬레이션할 수는 없습니다. 현재의 기술은 핵심 활성 사이트(Active Site) 주변의 양자 효과만을 집중 계산하고 나머지는 고전 AI가 결합 처리하는 현실적 단계에 최적화되어 있습니다.",
        },
        source: "노르마 및 바오밥에이바이오 산업 유즈케이스 세션",
      },
      {
        id: "qt-4",
        number: "04",
        title: "큐비트 아키텍처 다변화: 초전도 일변도에서 트랩이온·중성원자 부상",
        content:
          "과거 IBM과 구글이 주도하던 극저온 초전도(Superconducting) 방식 일변도에서 벗어나, 상온 근접 레이저 냉각 기술을 활용하는 트랩이온(Quantinuum, ZURIQ)과 중성원자(CAS Cold Atom) 방식이 게이트 충실도(Fidelity 99.9%+)와 시스템 소형화에서 압도적 우위를 보이며 시장 점유율을 급속히 확대하고 있습니다.",
        factCheck: {
          title: "현장 팩트체크",
          content:
            "초전도 방식은 칩 제조 공정의 성숙도가 높아 큐비트 집적 속도가 빠른 반면, 트랩이온 방식은 게이트 오차율이 낮으나 연산 속도(Gate Time)가 상대적으로 느립니다. 따라서 응용 분야(암호 해독 vs 정밀 물리 시뮬레이션)에 따른 하드웨어 적합성 평가가 반드시 수반되어야 합니다.",
        },
        source: "글로벌 양자 서밋 키노트 및 국가별 대표 기업 포럼",
      },
    ],
    conclusion:
      "📌 [종합 시사점 및 당사 제언]\n1. [전사 보안 PQC 마이그레이션 준비]: 2026 하반기 중 당사 핵심 대외 고객 서비스 및 클라우드 데이터베이스에 대해 '양자 취약점 영향도 평가(Crypto-Agility Assessment)'를 즉시 착수할 것을 권고함.\n2. [양자 알고리즘 PoC 추진]: 당사 제조 공정 및 공급망 최적화 부서를 중심으로 Quantinuum 및 큐노바의 양자 클라우드 SDK를 활용한 파일럿 PoC 과제를 기획하여 지적재산권(IP)을 선점해야 함.\n3. [전략적 산학연 얼라이언스 구축]: 원천기술 단독 개발보다는 탈레스, 노르마, 드림시큐리티 등 이미 검증된 국내외 선도 솔루션사와의 기술 협력을 통해 초기 R&D 투자 리스크를 최소화하고 신속한 시장 진입을 달성해야 함.",
  },
  ch06: {
    intro:
      "이 리포트 다음 페이지부터는 Quantum Korea 2026 현장에서 저희가 직접 수집한 참가기업별 카탈로그 원본을 고해상도로 스캔한 자료가 이어집니다. 부스에서 받으셨던 그 자료들을 다시 넘겨보시듯 확인하실 수 있고, 텍스트 검색도 가능합니다.",
    sketches: [
      {
        id: "qs6-1",
        photoUrl:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
        caption: "현장에서 수집된 45개 참가사 공식 기술 브로슈어 및 백서 컬렉션",
      },
      {
        id: "qs6-2",
        photoUrl:
          "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80",
        caption: "양자 연구 장비 및 정밀 계측 솔루션 쇼케이스 부스 상담 마무리 전경",
      },
      {
        id: "qs6-3",
        photoUrl:
          "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80",
        caption: "글로벌 파트너사들과 함께한 QX KOREA 2026 네트워킹 리셉션 현장",
      },
      {
        id: "qs6-4",
        photoUrl:
          "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&auto=format&fit=crop&q=80",
        caption: "3일간의 일정을 마무리하는 코엑스 Hall B 전시장 퇴장로 전경",
      },
    ],
    serviceTitle: "카탈로그익스프레스 소개",
    serviceDesc:
      "카탈로그익스프레스는 전시회 카탈로그를 대신 수집하고, 고해상도 스캔과 OCR로 디지털화해 검색 가능한 PDF 한 권으로 정리해 드리는 서비스입니다. 참가기업을 선별하지 않고 전체를 일괄 수집하며, 전시회에 직접 참석하셨든 안 하셨든 이용하실 수 있습니다.",
    slogan: "“전시회는 다녀오세요, 정리는 저희가 할게요”",
    contactEmail: "contact@catalogexpress.kr",
    website: "catalogexpress.kr",
    companyName: "영팩토리얼 주식회사",
  },
};
