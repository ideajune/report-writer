# Agent Interaction Rules

## No Submit Popups / Interactive Modals
- **절대 `ask_question` 도구를 호출하지 마십시오.** (IDE에 Submit/Skip 버튼이 포함된 모달 팝업이 뜨는 것을 금지합니다.)
- 추가 확인, 선택지, 질문이 필요한 경우 팝업 대신 일반 채팅 텍스트로 물어보거나 합리적인 기본값(권장안)으로 바로 진행하십시오.
- 아티팩트 생성 시 `RequestFeedback: false`로 설정하여 Proceed/Submit 승인 버튼이 나타나지 않도록 하십시오.
- 자율적이고 신속하게 작업을 완수하십시오.
