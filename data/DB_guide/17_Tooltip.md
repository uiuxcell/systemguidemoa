# 17_Tooltip (툴팁)

DB 등록: 3차
담당자: Lani
분류: 03. Component
작업: 2026년 10월 30일 오후 4:44
작업상태: 1차 완료

# Tooltip (툴팁)

## 0. 메타

### 0.1. 분류

- category: Tooltip
- group: Component

### 0.2. 타입 목록

- Standard: 제목과 본문 항목을 담는 기본 툴팁
- Label: 짧은 본문 텍스트로 구성된 툴팁
- Meta: 항목명과 오른쪽 정렬 데이터로 구성된 툴팁
- Bubble: 라벨과 보조 설명을 담는 말풍선 툴팁

### 0.3. 검색 키워드

- Standard: `기본 툴팁`, `Standard A`, `Standard B`, `본문 항목`
- Label: `텍스트 툴팁`, `짧은 안내`, `라벨`
- Meta: `항목별 정보`, `금액`, `오른쪽 정렬 데이터`
- Bubble: `말풍선`, `보조 설명`, `꼬리 위치`

---

## 1. 개요

### 1.1. 정의

- Tooltip은 사용자가 요소에 호버하거나 탭할 때 관련 부가 정보를 일시적으로 제공하는 UI 요소입니다.
- 요소의 기능이나 내용을 이해하는 데 필요한 보충 설명을 간결하게 제공합니다.

### 1.2. 적용 상황

- 요소의 기능·동작·내용에 대한 보충 설명이 필요할 때 사용합니다.
- 현재 화면의 맥락을 유지하면서 짧은 안내나 추가 데이터를 확인해야 할 때 사용합니다.

---

## 2. 사용 규칙 (Usage Rules)

### 2.1. 공통 규칙

- status: MUST
    
    content: 이 문서에 포함한 Standard, Label, Meta, Bubble은 SEC 전용으로 사용합니다.
    
- status: MUST
    
    content: 버튼 등 주요 UI 요소와 중요한 콘텐츠를 가리지 않도록 배치합니다.
    
- status: MUST
    
    content: 툴팁을 호출하는 요소(Trigger)를 기준으로 Top-Left, Top-Center, Top-Right, Bottom-Left, Bottom-Center, Bottom-Right 중 하나로 정렬합니다.
    
- status: SHOULD
    
    content: 사용자의 이해를 돕는 짧고 간결한 보조 정보로 구성합니다.
    
- status: AVOID
    
    content: 작업을 완료하는 데 반드시 필요한 정보를 Tooltip에 제공하지 않습니다.
    

### 2.2. 타입 선택 기준

- Standard: 제목과 본문을 함께 제공하거나 본문을 항목으로 나누어 설명할 때 사용합니다.
- Label: 요소의 의미나 짧은 안내를 간단한 텍스트로 제공할 때 사용합니다.
- Meta: 항목별 명칭과 금액 등의 데이터를 함께 확인해야 할 때 사용합니다.
- Bubble: 관련 요소를 말풍선으로 가리켜 짧은 안내나 보충 설명을 제공할 때 사용합니다.

### 2.3. 타입별 사용 규칙

#### 2.3.1. Type: Standard

- status: MUST
    
    content: 본문 영역은 Standard A에 Item A, Standard B에 Item B를 사용해 구성합니다.
    
- status: ALLOW
    
    content: Standard A는 Title Text와 Close Icon을 생략할 수 있습니다.
    
- status: ALLOW
    
    content: Standard B는 Title Text, Title Divider, Close Icon을 생략할 수 있습니다.
    
- status: ALLOW
    
    content: Item A와 Item B의 Body Text와 Bullet은 필요한 항목을 선택해 구성할 수 있습니다.
    
- status: ALLOW
    
    content: Standard B의 Container는 default 또는 light_gray 구성을 사용할 수 있습니다.
    

#### 2.3.2. Type: Label

- status: MUST
    
    content: Body Text로 간단한 안내 내용을 구성합니다.
    

#### 2.3.3. Type: Meta

- status: MUST
    
    content: Right Aligned Data 구성에서 항목명은 왼쪽, 대응하는 데이터는 오른쪽에 정렬합니다.
    
- status: ALLOW
    
    content: Item에 Title Text와 Subtitle Text를 선택적으로 제공합니다.
    
- status: ALLOW
    
    content: 항목명과 데이터는 Default Text·Default Metadata, Primary Text·Primary Metadata, Bold Text·Bold Metadata를 조합해 구성할 수 있습니다.
    
- status: ALLOW
    
    content: Item에 Bullet과 Description Text를 선택적으로 제공합니다.
    

#### 2.3.4. Type: Bubble

- status: MUST
    
    content: Label을 기본으로 제공합니다.
    
- status: ALLOW
    
    content: Label 아래에 Description Text를 추가할 수 있습니다.
    
- status: MUST
    
    content: Center, Right, Left는 말풍선 꼬리를 각각 중앙, 오른쪽, 왼쪽에 배치합니다.