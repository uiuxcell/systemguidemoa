# 16_Option Selector (옵션 선택)

DB 등록: 2차
담당자: Lani
분류: 02. Element
작업: 2026년 10월 29일 오후 5:13
작업상태: 1차 완료
하위 항목: Image (https://app.notion.com/p/Image-3ba159291832802a8cc6fcf8bb0e4a67?pvs=21), Label  (https://app.notion.com/p/Label-3ba15929183280d89974ea2b6e90caae?pvs=21), Meta (https://app.notion.com/p/Meta-3ba159291832802cbea0db474a1a6962?pvs=21), Color (https://app.notion.com/p/Color-3ba15929183280828f7ae9e6719a03dc?pvs=21)

# Option Selector (옵션 선택)

## 0. 메타

### 0.1. 분류

- category: Option Selector
- group: Element

### 0.2. 타입 목록

- Image: 이미지 또는 로고로 구성된 옵션
- Label: 텍스트 라벨로 구성된 옵션
- Meta: 메인 텍스트와 보조 정보로 구성된 옵션
- Color: 원형 컬러칩으로 구성된 색상 옵션

### 0.3. 검색 키워드

- Image: `이미지 옵션`, `이미지`, `로고`
- Label: `텍스트 옵션`, `사이즈`, `라벨`
- Meta: `정보 옵션`, `가격`, `보조 정보`
- Color: `색상 옵션`, `컬러칩`, `색상`, `컬러`

---

## 1. 개요

### 1.1. 정의

- Option Selector는 다양한 상품 옵션 조합을 제시하고, 사용자가 그중 하나를 선택하도록 하는 UI 요소입니다.
- 옵션을 표현하는 방식에 따라 Image, Label, Meta, Color 타입으로 구분합니다.

### 1.2. 적용 상황

- 상품의 다양한 옵션 조합 중 하나를 선택해야 할 때 사용합니다.
- 상품의 특성과 목적에 맞게 이미지, 텍스트, 보조 정보 또는 컬러칩으로 옵션을 제시해야 할 때 사용합니다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: MUST
    
    content: 사용자가 옵션을 쉽고 직관적으로 이해할 수 있도록 구성합니다.
    
- status: MUST
    
    content: 상품의 특성과 목적에 맞는 타입을 선택합니다.
    
- status: MUST
    
    content: 동일한 속성의 옵션에는 같은 타입을 사용합니다.
    
- status: SHOULD
    
    content: 옵션을 쉽게 훑어보고 선택할 수 있도록 크기에 따라 가로 또는 세로로 배치합니다.
    
- status: ALLOW
    
    content: 가독성을 위해 필요한 경우 행이나 열을 나누어 배치할 수 있습니다.
    

### 2.2. 타입 선택 기준

- Image: 대표 이미지·로고를 보고 옵션을 선택할 때 사용합니다.
- Label: 텍스트로 제시된 옵션을 선택할 때 사용합니다.
- Meta: 메인 텍스트와 보조 정보를 함께 확인하며 옵션을 선택할 때 사용합니다.
- Color: 컬러 옵션을 선택할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Image

- status: MUST
    
    content: Standard는 SEC 전용으로 사용합니다.
    
- status: MUST
    
    content: 이미지는 옵션 영역 안에서 중앙 정렬합니다.
    

#### 2.3.2. Type: Label

- status: MUST
    
    content: Standard / Common은 Medium과 Large 크기로 구성됩니다.
    
- status: MUST
    
    content: Standard / Common의 Label은 Container 안에서 중앙 정렬합니다.
    
- status: MUST
    
    content: Standard_A와 Standard_B는 SEC 전용으로 사용합니다.
    

#### 2.3.3. Type: Meta

- status: MUST
    
    content: Right Aligned Data, Left Aligned Icon + Right Aligned Data, Bottom Aligned Data는 Common 구성입니다.
    
- status: MUST
    
    content: Multi Label + Right Aligned Data와 Left Aligned Data는 SEC 전용으로 사용합니다.
    
- status: MUST
    
    content: Right Aligned Data와 Left Aligned Icon + Right Aligned Data는 Label을 왼쪽, Metadata를 오른쪽에 정렬합니다.
    
- status: MUST
    
    content: Left Aligned Icon + Right Aligned Data는 Icon을 Label 왼쪽에 배치합니다.
    
- status: MUST
    
    content: Bottom Aligned Data는 Label 아래에 Metadata를 배치하고, 두 요소를 중앙 정렬합니다.
    
- status: MUST
    
    content: Multi Label + Right Aligned Data는 Label, Label Sub, Label text divider를 왼쪽에 정렬하고, Metadata를 오른쪽에 정렬합니다.
    
- status: MUST
    
    content: Left Aligned Data는 Label 아래에 Metadata를 배치하고, 두 요소를 왼쪽 정렬합니다.
    

#### 2.3.4. Type: Color

- status: MUST
    
    content: Standard 구성입니다.
    
- status: MUST
    
    content: Inner Circle과 Inner Circle Border로 컬러칩을 구성합니다.
    

### 2.4. 세부 적용 규칙

- Light BG 기준입니다.