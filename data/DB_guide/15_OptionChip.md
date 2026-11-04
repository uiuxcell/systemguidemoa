# 15_Option Chip

DB 등록: 2차
담당자: Rhea
분류: 02. Element
작업: 2026년 10월 23일 오후 1:49
작업상태: 진행 중
하위 항목: Color (https://app.notion.com/p/Color-3b415929183280189706d8dd36864708?pvs=21), Label (https://app.notion.com/p/Label-3b415929183280678f44e4982bec5c08?pvs=21)

# Option Chip (옵션 칩)

## 0. 메타

### 0.1. 분류

- category: `Option Chip`
- group: `Element`

### 0.2. 타입 목록

- `Color`
- `Label`

### 0.3. 검색 키워드

- Color : `사용규칙`, `사용처 정의`, `스펙 및 토큰`
- Label : `사용규칙`, `사용처 정의`, `스펙 및 토큰`

---

## 1. 개요

### 1.1. 정의

- **정의:** Option Chip은 사용자가 여러 옵션 중 하나 또는 복수의 항목을 선택하거나 필터링할 수 있도록 제공하는 컴포넌트입니다.
- **사용 목적:** 상품 옵션 선택, 필터 조건 지정 등 직관적인 선택 액션을 제공하고, 선택 여부와 사용 가능 상태를 시각적으로 명확하게 전달합니다.
- **기본 구성:** `Inner Circle`(내부 원형 요소), `Border`(칩 외곽 테두리), `Inner Circle Border`(내부 원 테두리), `Label`(텍스트 라벨), `Container`(전체 컨테이너 영역)로 구성됩니다. 타입에 따라 실제 적용되는 요소는 다릅니다.
- **기본 원칙:** 선택 대상에 적합한 타입을 사용하고, 선택·미선택 상태를 명확히 구분하며, 선택할 수 없는 옵션은 사용 맥락에 따라 숨김 또는 비활성화 상태로 제공합니다.

### 1.2. 적용 상황

- `Color` : 제품의 컬러 옵션을 시각적으로 보여주고 사용자가 원하는 색상을 선택할 수 있도록 제공할 때 사용합니다.
- `Label` : 저장 용량, 크기 등 제품의 주요 사양이나 텍스트 기반 옵션을 선택 또는 필터링할 때 사용합니다.
- `Color Group` : 여러 개의 컬러 옵션과 선택된 색상의 속성명을 함께 제공해야 할 때 사용합니다.
- `Theme` : 밝거나 어두운 배경에서 옵션 칩을 제공할 때 해당 배경에 적합한 테마 규칙을 적용합니다.
- `State` : 옵션의 선택 여부와 사용 가능 여부를 표현할 때 `Normal`, `Hover`, `Selected`, `Disabled` 상태를 적용합니다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: `MUST`
    
    content: 선택된 옵션과 선택되지 않은 옵션은 시각적 스타일을 통해 명확하게 구분한다.
    
- status: `MUST`
    
    content: 선택할 수 없는 옵션은 사용 맥락에 따라 숨김(`Hidden`) 또는 비활성화(`Disabled`) 상태로 표현한다.
    
- status: `AVOID`
    
    content: 선택되지 않은 옵션을 선택된 상태로 표시하거나, 선택할 수 없는 옵션을 선택 가능한 상태로 표현하지 않는다.
    
- status: `MUST`
    
    content: 옵션 칩의 높이, 패딩, 라운드 및 상태별 색상 토큰은 Figma에 정의된 값을 그대로 적용한다.
    
- status: `MUST`
    
    content: 배경 테마(`light_bg` / `dark_bg`)에 따라 정의된 텍스트 및 테두리 색상 반전 규칙을 준수한다.
    
- status: `MUST`
    
    content: 밝은 배경에서는 Black 계열, 어두운 배경에서는 White 계열의 정의된 텍스트 및 테두리 색상을 적용한다.
    
- status: `MUST`
    
    content: `state = Normal`은 기본 대기 상태로 정의된 기본 스타일을 적용한다.
    
- status: `MUST`
    
    content: `state = Hover`는 마우스 포인터가 위치한 상태로 정의된 투명도 또는 외곽 테두리 활성화 규칙을 적용한다.
    
- status: `MUST`
    
    content: `state = Selected`는 옵션이 선택된 상태로 정의된 외곽 테두리를 활성화한다.
    
- status: `MUST`
    
    content: `state = Disabled`는 선택할 수 없는 상태로 사용자 인터랙션을 허용하지 않는다.
    
- status: `SHOULD`
    
    content: `state = Disabled`인 경우 전체 요소 또는 지정된 속성에 `20%` Opacity를 적용한다.
    
- status: `SHOULD`
    
    content: 텍스트 라벨이 포함된 경우 `PC`와 `MO` 환경에 따라 정의된 폰트 크기 및 패딩 기준을 구분하여 적용한다.
    
- status: `AVOID`
    
    content: Figma에 정의된 높이, 패딩, 라운드 및 상태별 색상 토큰을 임의로 변경하지 않는다.
    

### 2.2. 타입 선택 기준

- Color:
    - status: `SHOULD`
        
        content: 색상 자체가 선택 대상이고, 제품의 컬러 옵션을 시각적으로 제공해야 할 때 사용한다.
        
- Label:
    - status: `SHOULD`
        
        content: 텍스트를 기준으로 제품의 사양이나 옵션을 선택 또는 필터링해야 할 때 사용한다.
        

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Color

- status: `MUST`
    
    content: `Inner Circle`, `Border`, `Inner Circle Border`, `Container`로 구성된 정의된 컴포넌트 구조를 기준으로 사용한다.
    
- status: `MUST`
    
    content: 선택된 컬러 옵션은 정의된 외곽 `Border`를 활성화하여 다른 옵션과 명확하게 구분한다.
    
- status: `MUST`
    
    content: 선택되지 않은 컬러 옵션에는 선택 상태를 나타내는 외곽 테두리를 적용하지 않는다.
    
- status: `MUST`
    
    content: 선택할 수 없는 컬러 옵션은 `Hidden` 또는 `Disabled` 상태로 제공하여 선택 가능한 옵션과 구분한다.
    
- status: `SHOULD`
    
    content: 선택된 컬러 옵션의 속성명을 텍스트 라벨로 함께 제공하여 현재 선택한 색상을 명확하게 인지할 수 있도록 한다.
    
- status: `SHOULD`
    
    content: 배경 테마에 따라 정의된 외곽 테두리 색상 반전 규칙을 적용한다.
    
- status: `AVOID`
    
    content: 모든 컬러 옵션에 동일한 선택 상태 스타일을 적용하여 현재 선택된 옵션을 구분하기 어렵게 만들지 않는다.
    

#### 2.3.2. Type: Label

- status: `MUST`
    
    content: `Border`, `Label`로 구성된 정의된 컴포넌트 구조를 기준으로 사용한다.
    
- status: `MUST`
    
    content: 텍스트 기반의 제품 옵션이나 사양을 표시할 때 정의된 라벨 및 컨테이너 스타일을 적용한다.
    
- status: `MUST`
    
    content: 좌우 패딩은 `8px`을 유지하고, 상하 패딩은 플랫폼별 정의된 값을 적용한다.
    
- status: `MUST`
    
    content: 선택된 옵션은 정의된 외곽 `Border`를 활성화하여 선택되지 않은 옵션과 명확하게 구분한다.
    
- status: `MUST`
    
    content: 선택할 수 없는 옵션은 `Hidden` 또는 `Disabled` 상태로 제공하여 선택 가능한 옵션과 구분한다.
    
- status: `SHOULD`
    
    content: `PC`와 `MO` 환경에 따라 정의된 폰트 크기 및 패딩 기준을 구분하여 적용한다.
    
- status: `SHOULD`
    
    content: 배경 테마에 따라 정의된 텍스트 및 테두리 색상 반전 규칙을 적용한다.
    
- status: `AVOID`
    
    content: 선택되지 않은 옵션에 선택 상태와 동일한 스타일을 적용하여 사용자가 선택 여부를 혼동하도록 만들지 않는다.
    

### 2.4. 세부 적용 규칙

#### 2.4.1. Color Group

- status: `MUST`
    
    content: 여러 개의 컬러 칩을 그룹으로 나열할 경우 개별 칩 사이의 간격(`Gap`)은 `8px`을 유지한다.
    
- status: `MUST`
    
    content: 컬러 칩과 컬러 속성명 라벨 사이의 간격(`Gap`)은 `4px`을 유지한다.
    
- status: `MUST`
    
    content: 컬러 그룹은 좌측 정렬(`Left-aligned`)을 적용한다.