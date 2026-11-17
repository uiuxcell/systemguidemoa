# Figma(updated.fig) 확인 필요 항목

랜딩메뉴 데이터로 옮기면서 발견한 내용이에요. md는 아래처럼 처리했어요.

- Text Field: 랜딩 타이틀이 "Tab의 구성이에요." → md에서는 "Text Field의 구성이에요."로 수정
- Color: 한 눈에 보기의 Secondary Color 블록이 placeholder(title / Color #000000) → 기존 문구 + Secondary 답변 프레임의 컬러값으로 채움
- Color: Primary/Secondary 답변의 버블 본문이 아래 항목(Black & White, Coral 계열…)과 같은 내용 → 항목만 남김
- Filter: 타이틀 프레임이 2개(@11325,7676 / @11767,7676). 앞 프레임의 PC/MO 값이 "12x12 / 16x16 / 24x24"(Iconography 값 복사) → 뒤 프레임 사용
- List: 한 눈에 보기의 Item Indent·Item Selection 설명이 Tab 문구("아이콘과 텍스트를 함께 제공하는 카드형 탭에 사용") 그대로예요
- List: Item Indent·Item Selection 답변 이미지가 Item Default와 같은 img_List_all_02예요 (한 눈에 보기에는 각각 03, 04)
- Indicator: Bar 답변 제목이 Arrow와 같은 "이전·다음 콘텐츠로 이동할 때 사용해요." / ※ 문구도 Arrow와 같아요
- Spacing: Grid 답변 본문이 Gap 본문과 같아요
- Tooltip: 칩 "CTA Button_Icon", "Dimmed&Shadow" → 카테고리로 이동되도록 "CTA Button Icon", "Dimmed & Shadow"로 맞춤
- Radius: 8px 이미지가 Menu의 img_menu_all_01과 같은 이미지 → Radius에는 따로 저장하지 않고 `Menu/img_menu_all_01` 참조. Radius에는 img_radius_all_03이 없어요
- 이름 없는 이미지(레이어명이 img_로 시작하지 않음)는 `img_<카테고리>_all_NN` 순번으로 저장: Indicator: `img_Indicator_all_05`, Indicator: `img_Indicator_all_06`, Radius: `img_radius_all_02`, Tooltip: `img_Tooltip_all_02`, Tooltip: `img_Tooltip_all_03`, Tooltip: `img_Tooltip_all_04`, Spacing: `img_spacing_all_02`, Spacing: `img_spacing_all_03`, Chip: `img_Chip_all_01`, Chip: `img_Chip_all_02`, Selection Control: `img_Selection Control_all_02`, Selection Control: `img_Selection Control_all_03`, Popup: `img_Popup_all_02`, Popup: `img_Popup_all_03`, Popup: `img_Popup_all_04`, Divider: `img_Divider_all_01`, Divider: `img_Divider_all_02`, Option Selector: `img_Option Selector_all_01`, Option Selector: `img_Option Selector_all_02`, Option Selector: `img_Option Selector_all_03`, Option Selector: `img_Option Selector_all_04`, Badge: `img_badge_all_02`, Badge: `img_badge_all_03`, Badge: `img_badge_all_04`, Badge: `img_badge_all_05`, Iconography: `img_iconography_all_01`, Iconography: `img_iconography_all_02`, Menu: `img_menu_all_03`, List: `img_List_all_03`, List: `img_List_all_04`, Text Field: `img_Text Field_all_02`, Text Field: `img_Text Field_all_03`
