# Agent Interaction Rules

## No Submit Popups / Interactive Modals
- **절대 `ask_question` 도구를 호출하지 마십시오.** (IDE에 Submit/Skip 버튼이 포함된 모달 팝업이 뜨는 것을 금지합니다.)
- 추가 확인, 선택지, 질문이 필요한 경우 팝업 대신 일반 채팅 텍스트로 물어보거나 합리적인 기본값(권장안)으로 바로 진행하십시오.
- 아티팩트 생성 시 `RequestFeedback: false`로 설정하여 Proceed/Submit 승인 버튼이 나타나지 않도록 하십시오.
- 자율적이고 신속하게 작업을 완수하십시오.

## Default Display Principle (기본 표시 원칙)
- **기본값(Default)은 항상 사진 + 소제목 동시 표시**: 보고서 열람, 인쇄, 초기 로드 시 사진과 관련 소제목(현장 스케치 등)이 모두 온전히 노출되는 상태가 기본입니다.
- **사진 및 소제목 숨김/제외는 사용자가 명시적으로 별도 요청하거나 헤더 버튼을 직접 조작했을 때만 작업/전환**합니다.
