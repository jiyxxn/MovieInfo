// * toggleBtnState()
// | - 버튼 상태 변경 유틸리티
export const toggleBtnState = function (e, state, text) {
  e.target.setAttribute("data-state", state);
  e.target.innerText = text;
};
