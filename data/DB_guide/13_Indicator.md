# 13_Indicator (인디케이터)

DB 등록: 2차
담당자: Joy
분류: 02. Element
작업: 2026년 10월 28일 오후 7:11
작업상태: 1차 완료
하위 항목: Dot (https://app.notion.com/p/Dot-38a1592918328066b886c7cde382f735?pvs=21), Arrow (https://app.notion.com/p/Arrow-38a15929183280bd89fdf438401c7383?pvs=21), Number (https://app.notion.com/p/Number-38a159291832804c8c62e7e31ea62352?pvs=21), Scroll Indicator (https://app.notion.com/p/Scroll-Indicator-38a15929183280d2b13fc594f89aabb2?pvs=21), Bar (https://app.notion.com/p/Bar-38a1592918328049bacef35539590d6f?pvs=21)

# **Indicator (인디케이터)**

## **0. 메타**

### **0.1. 분류**

- category: Indicator
- group: Element

### **0.2. 타입 종류**

- Dot: 카드형 콘텐츠의 범위와 현재 위치를 점으로 표시하는 인디케이터
- Arrow: 이전 또는 다음 콘텐츠로 이동하는 화살표 인디케이터
- Number: 현재 위치와 전체 개수를 숫자로 표시하는 인디케이터
- Scroll: 보이는 영역 밖의 콘텐츠를 가로로 탐색하는 스크롤 인디케이터
- Bar: 재생 시간이 있는 미디어 콘텐츠의 위치와 진행 상황을 막대로 표시하는 인디케이터

### **0.3. 검색 키워드**

- Dot: 닷 인디케이터, 점 인디케이터, 페이지네이션, 캐러셀 인디케이터, 슬라이드 위치
- Arrow: 화살표 인디케이터, 이전 다음 버튼, 좌우 화살표, 캐러셀 화살표
- Number: 숫자 인디케이터, 페이지 번호, 현재 위치 숫자, 1/5 표시
- Scroll: 스크롤 인디케이터, 스크롤바, 가로 스크롤, 스크롤 위치
- Bar: 바 인디케이터, 영상 진행바, 재생 진행 표시, 미디어 진행 막대

---

## **1. 개요**

### **1.1. 정의**

- Indicator는 탐색 가능한 콘텐츠의 범위와 현재 항목의 위치를 표시하고, 콘텐츠 간 이동을 돕는 컴포넌트입니다.
- 시각적 단서로 콘텐츠의 흐름을 보여주며, 콘텐츠 구조와 화면 크기에 따라 Dot, Arrow, Number, Scroll, Bar로 구분합니다.

### **1.2. 적용 상황**

- 캐러셀처럼 카드 단위로 나뉜 콘텐츠의 범위와 현재 위치를 보여줄 때 적용합니다.
- 가로로 이어지는 연속 스크롤 콘텐츠를 탐색하게 할 때 적용합니다.
- 영상처럼 재생 시간이 있는 콘텐츠의 위치와 진행 상황을 보여줄 때 적용합니다.
- 이전 또는 다음 콘텐츠로 이동하는 컨트롤을 제공할 때 적용합니다.

---

## **2. 사용 규칙**

### **2.1. 공통 규칙**

- status: MUST content: 인디케이터는 콘텐츠 영역의 하단 중앙에 배치합니다.
- status: MUST content: 콘텐츠의 가독성과 조작을 방해하지 않는 위치에 배치합니다.
- status: MUST content: 화살표 조작은 키보드와 스크린 리더로도 할 수 있게 하며, Tab 키나 방향키로 포커스가 이동하고 가로 이동이 가능해야 합니다.
- status: SHOULD content: 화면 폭과 레이아웃 제약에 맞는 인디케이터 타입을 선택합니다.
- status: SHOULD content: Mobile 캐러셀에는 화살표와 함께 좌우 터치 영역을 충분히 확보합니다.
- status: SHOULD content: 터치, 키보드, 스크린 리더 등 모든 입력 방식에서 일관된 경험을 제공합니다.
- status: AVOID content: 접근성용 화살표 영역을 화면에 보이게 노출하지 않고, 이미지 안에 투명하게 둡니다.
- status: AVOID content: 스크린 리더에서 투명 터치 영역을 중복으로 안내하지 않으며, 화살표 버튼은 하나의 요소로 인식되게 합니다.

### **2.2. Type 선택 규칙**

- Dot:
    - 캐러셀처럼 카드 단위로 나뉜 콘텐츠에 사용합니다.
    - 좁은 화면에서 Bar를 대신해 사용합니다.
- Arrow:
    - 이전 또는 다음 콘텐츠로 넘기는 컨트롤이 필요할 때 사용합니다.
- Number:
    - 현재 위치와 전체 개수를 숫자로 명확히 보여줘야 할 때 사용합니다.
    - 콘텐츠 개수가 많아 점으로 보여주기 어려울 때 사용합니다. [확인 필요: Dot과 Number의 선택 기준이 PDF에 없음]
- Scroll:
    - 가로로 이어지는 연속 스크롤 콘텐츠에 사용합니다.
- Bar:
    - 영상처럼 재생 시간이 있는 미디어 콘텐츠의 위치와 진행 상황을 보여줄 때 사용합니다.
    - PC에서만 사용합니다.

### **2.3. 타입별 사용 규칙**

#### **2.3.1. Type: Dot**

- status: MUST content: 캐러셀처럼 카드 단위로 나뉜 콘텐츠에 사용합니다.
- status: MUST content: 기본형은 최대 7개까지, Play/Pause 컨트롤 없이 사용합니다.
- status: SHOULD content: 콘텐츠가 7개를 넘으면 끝쪽 점이 작아지는 More than 7 타입을 사용합니다.
- status: SHOULD content: 자동 재생 콘텐츠에는 Play/Pause 아이콘이 붙은 타입을 사용합니다.
- status: SHOULD content: 좁은 화면(Mobile)에서는 Bar 대신 Play/Pause가 붙은 Dot을 사용합니다.
- status: AVOID content: Medium, Small 크기의 점은 More than 7 타입 외에는 사용하지 않습니다.

#### **2.3.2. Type: Arrow**

- status: MUST content: 이전 또는 다음 콘텐츠로 이동할 때 사용합니다.
- status: MUST content: 처음에는 다음 화살표만, 중간에는 양쪽 화살표가, 마지막에는 이전 화살표만 동작하도록 합니다.
- status: SHOULD content: 맥락에 따라 두 가지 스타일을 구분하여 사용합니다. [확인 필요: 두 스타일의 구분 기준이 PDF에 없음]
- status: AVOID content: 접근성용 투명 화살표 영역을 화면에 노출하지 않습니다.

#### **2.3.3. Type: Number**

- status: MUST content: 현재 위치와 전체 개수를 "현재 / 전체"(예: 1 / 5) 형식으로 표시합니다.
- status: SHOULD content: 현재 숫자는 진하게, 전체 숫자는 연하게 표시하여 구분합니다.
- status: SHOULD content: PC와 Mobile에 각각 정의된 크기를 적용합니다.
- status: AVOID content: 99개를 넘는 콘텐츠의 위치 표시에는 사용하지 않습니다.

#### **2.3.4. Type: Scroll**

- status: MUST content: 가로로 이어지는 연속 스크롤 콘텐츠에 사용합니다.
- status: MUST content: 막대가 스크롤 위치를 따라 늘어나며 Default, Scrolled, End 상태를 표시합니다.
- status: SHOULD content: PC에서는 오른쪽에 이전·다음 화살표를 함께 두고, Mobile에서는 화살표 없이 막대만 사용합니다.
- status: SHOULD content: 처음에는 이전 화살표를, 끝에서는 다음 화살표를 비활성화합니다.
- status: AVOID content: 카드 단위로 나뉜 콘텐츠에는 Scroll을 사용하지 않고 Dot을 사용합니다.

#### **2.3.5. Type: Bar**

- status: MUST content: 재생 시간이 있는 미디어 콘텐츠의 위치와 진행 상황을 보여줄 때 사용합니다.
- status: MUST content: PC에서만 사용하며, 아이템은 최소 1개에서 최대 7개까지 사용합니다.
- status: SHOULD content: 좌우에 정의된 여백을 두고 가운데 정렬합니다.
- status: ALLOW content: 라벨은 선택적으로 사용할 수 있으며, 아이템에 Hover하면 막대 위에 표시합니다. 라벨은 15자 이내로 작성합니다.
- status: AVOID content: 좁은 화면(Mobile)에서는 Bar를 사용하지 않고 Dot으로 대체합니다.
- status: AVOID content: 아이템을 7개보다 많이 두거나 라벨을 15자보다 길게 작성하지 않습니다.