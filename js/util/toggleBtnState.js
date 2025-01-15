// * toggleBtnState()
// | - 버튼 상태 변경 유틸리티
export const toggleBtnState = function (button, state, text) {
  button.setAttribute("data-state", state);
  button.innerText = text;
};
