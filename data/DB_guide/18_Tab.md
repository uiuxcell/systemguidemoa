# 18_Tab (탭)

DB 등록: 3차
담당자: Rhea
분류: 03. Component
작업: 2026년 10월 23일 오후 2:40
작업상태: 진행 중

# Tab (탭)

## 0. 메타

### 0.1. 분류

- category: `Tab`
- group: `Element`

### 0.2. 타입 목록

- `Standard`
- `Icon`

### 0.3. 검색 키워드

- Standard : `탭`, `텍스트 탭`, `카테고리`, `콘텐츠 전환`, `언더라인`, `Underline`, `Filled`, `테두리 탭`, `고정형 탭`, `스크롤 탭`
- Icon : `탭`, `아이콘 탭`, `카드형 탭`, `아이콘 메뉴`, `콘텐츠 전환`, `선택 상태`, `가로 스크롤`

---

## 1. 개요

### 1.1. 정의

- Tab은 동일한 화면 내에서 서로 연관된 콘텐츠를 구분하고, 사용자가 원하는 콘텐츠 영역을 선택하여 전환할 수 있도록 제공하는 내비게이션 컴포넌트이다.
- Tab은 `Standard`, `Icon` 2가지 Type으로 구성한다.
- `Standard`는 텍스트 Label을 중심으로 구성하며, `Underline`, `Filled` 2가지 스타일로 구분한다.
- `Icon`은 Icon과 Label을 결합한 카드 형태로 구성한다.
- 선택된 탭은 시각적으로 구분되며, 탭 선택 시 해당 콘텐츠 영역이 함께 전환된다.
- 탭의 배치 방식은 `Fixed`, `Scrollable`로 구분한다.
- PC와 Mobile 환경에 따라 상태 및 인터랙션 방식을 구분하여 적용한다.

### 1.2. 적용 상황

- 동일한 정보 위계의 콘텐츠를 여러 카테고리로 분류하고 전환해야 하는 경우
- 사용자가 현재 선택한 콘텐츠 영역을 명확하게 인지해야 하는 경우
- 동일한 화면에서 연관된 콘텐츠를 탐색하거나 전환해야 하는 경우
- 탭 항목이 화면 너비를 초과하여 가로 스크롤이 필요한 경우

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: `MUST`
    
    content: 하나의 Tab 그룹에서는 한 번에 하나의 항목만 선택된 상태로 유지한다.
    
- status: `MUST`
    
    content: 탭 선택 시 선택 상태 변경과 연결된 콘텐츠 전환이 함께 시작되어야 한다.
    
- status: `MUST`
    
    content: 탭 선택 시 기존 선택 항목은 선택 해제되고, 새롭게 선택된 항목에 선택 상태가 적용되어야 한다.
    
- status: `MUST`
    
    content: 선택된 탭은 각 Type 및 스타일에 정의된 방식으로 선택되지 않은 탭과 시각적으로 구분한다.
    
- status: `MUST`
    
    content: PC와 Mobile 환경에 따라 정의된 상태 및 인터랙션 방식을 구분하여 적용한다.
    

### 2.2. 타입 선택 기준

- Standard:
    - 텍스트 중심으로 콘텐츠 카테고리를 구분하고 전환하는 경우 사용한다.
    - 선택 상태를 Underline 또는 Border로 표현하는 경우 사용한다.
    - `Underline`은 Label 하단의 선으로 선택 상태를 구분하는 스타일이다.
    - `Filled`는 둥근 Border를 가진 텍스트 탭으로, Border 스타일을 통해 선택 상태를 구분한다.
- Icon:
    - Icon과 Label을 함께 제공하여 항목을 시각적으로 구분하는 경우 사용한다.
    - 각 항목을 독립적인 카드 형태로 제공하는 경우 사용한다.
    - Icon을 통해 각 항목의 의미를 시각적으로 전달하는 경우 사용한다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Standard

- status: `MUST`
    
    content: 텍스트 Label을 중심으로 탭 항목을 구성한다.
    
- status: `MUST`
    
    content: `Underline`과 `Filled` 스타일을 구분하고, 각 스타일에 정의된 선택 상태 표현 방식을 적용한다.
    
- status: `MUST`
    
    content: `Underline` 스타일은 Label 하단의 Underline으로, `Filled` 스타일은 Border로 선택 상태를 표현한다.
    
- status: `MUST`
    
    content: 각 스타일의 상태별 시각적 변화는 해당 스타일에 정의된 가이드를 따른다.
    

#### 2.3.2. Type: Icon

- status: `MUST`
    
    content: Icon과 Label을 함께 제공하여 탭 항목을 구성한다.
    
- status: `MUST`
    
    content: Icon은 Label 상단에 배치하고 두 요소를 중앙 정렬한다.
    
- status: `MUST`
    
    content: 탭 항목은 Border로 구분되는 카드 형태로 제공한다.
    
- status: `MUST`
    
    content: 선택된 탭은 Border 컬러 변경을 통해 선택 상태를 표시한다.
    
- status: `MUST`
    
    content: 선택되지 않은 탭은 기본 Border 스타일을 유지한다.
    
- status: `MUST`
    
    content: 상태별 시각적 변화는 Icon Type에 정의된 가이드를 따른다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. Fixed Type

- status: `MUST`
    
    content: Fixed Type은 지정된 영역에 탭 항목을 고정하여 배치한다.
    
- status: `MUST`
    
    content: 탭 선택 시 항목의 배치 순서와 위치는 변경되지 않는다.
    
- status: `SHOULD`
    
    content: 모든 탭 항목을 지정된 영역 안에 표시할 수 있는 경우 Fixed Type을 사용한다.
    

#### 2.4.2. Scrollable Type

- status: `MUST`
    
    content: 탭 항목이 디바이스 너비를 초과하는 경우 가로 스크롤 방식으로 전환한다.
    
- status: `MUST`
    
    content: 화면 밖에 위치한 탭도 가로 스크롤을 통해 접근할 수 있어야 한다.
    
- status: `MUST`
    
    content: 숨겨진 탭을 선택하면 해당 항목이 화면에 표시되도록 스크롤 위치가 이동해야 한다.
    
- status: `MUST`
    
    content: Scrollable Type의 스크롤 이동 위치와 인터랙션은 해당 Type에 정의된 기준을 따른다.
    

#### 2.4.3. PC 상태 및 인터랙션

- status: `MUST`
    
    content: PC 환경에서는 `Normal`, `Hover`, `Selected`, `Selected Hover` 상태를 구분하여 적용한다.
    
- status: `MUST`
    
    content: `Normal`은 선택되지 않은 탭의 기본 상태로 제공한다.
    
- status: `MUST`
    
    content: `Hover`는 선택되지 않은 탭에 마우스를 올렸을 때 적용한다.
    
- status: `MUST`
    
    content: `Selected`는 현재 선택된 탭에 적용한다.
    
- status: `MUST`
    
    content: `Selected Hover`는 선택된 탭에 마우스를 올렸을 때 적용하며 선택 상태를 유지한다.
    
- status: `MUST`
    
    content: 상태별 시각적 변화는 각 Type 및 스타일에 정의된 가이드를 따른다.
    

#### 2.4.4. Mobile 상태 및 인터랙션

- status: `MUST`
    
    content: Mobile 환경에서는 `Normal`, `Pressed`, `Selected`, `Pressed Selected` 상태를 구분하여 적용한다.
    
- status: `MUST`
    
    content: `Normal`은 선택되지 않은 탭의 기본 상태로 제공한다.
    
- status: `MUST`
    
    content: `Pressed`는 선택되지 않은 탭을 누르고 있는 동안 적용한다.
    
- status: `MUST`
    
    content: `Selected`는 현재 선택된 탭에 적용한다.
    
- status: `MUST`
    
    content: `Pressed Selected`는 선택된 탭을 누르고 있는 동안 적용하며 선택 상태를 유지한다.
    
- status: `MUST`
    
    content: 상태별 시각적 변화는 각 Type 및 스타일에 정의된 가이드를 따른다.
    

#### 2.4.5. Standard / Underline

- status: `MUST`
    
    content: 선택된 탭은 Label 하단의 Underline을 통해 표시한다.
    
- status: `MUST`
    
    content: Underline은 선택된 Label의 텍스트 너비를 기준으로 표시한다.
    
- status: `MUST`
    
    content: 선택되지 않은 탭에는 Underline을 표시하지 않는다.
    
- status: `MUST`
    
    content: 탭 선택 시 기존 Underline이 사라지고 새롭게 선택된 항목에 Underline이 표시되어야 한다.
    

#### 2.4.6. Standard / Filled

- status: `MUST`
    
    content: Filled 스타일은 텍스트 Label과 둥근 Border를 가진 탭 항목으로 구성한다.
    
- status: `MUST`
    
    content: Filled 스타일의 선택 상태는 Border 컬러 및 두께를 통해 구분한다.
    
- status: `MUST`
    
    content: 선택되지 않은 탭은 해당 상태에 정의된 기본 Border 스타일을 적용한다.
    
- status: `MUST`
    
    content: PC의 `Hover`, `Selected Hover` 상태에서는 각 상태에 정의된 Label 및 Border 스타일을 적용한다.
    
- status: `MUST`
    
    content: Mobile의 `Pressed`, `Pressed Selected` 상태에서는 각 상태에 정의된 Label 및 Border 스타일을 적용한다.
    
- status: `MUST`
    
    content: `Selected Hover`, `Pressed Selected` 상태에서는 선택 상태를 유지하면서 해당 인터랙션 상태의 스타일을 적용한다.
    
- status: `MUST`
    
    content: Filled 스타일은 일반적인 배경 채움 방식으로 해석하지 않고, 정의된 Label 및 Border 스타일을 기준으로 적용한다.