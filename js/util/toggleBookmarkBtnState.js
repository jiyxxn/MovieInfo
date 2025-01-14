const btnToggleBookmark = document.querySelector(".btnToggleBookmark"); // 북마크 보기 버튼

// * toggleBookmarkBtnState()
// | - 버튼 상태 변경 유틸리티
export const toggleBookmarkBtnState = function (state, text) {
  btnToggleBookmark.setAttribute("data-state", state);
  btnToggleBookmark.innerText = text;
};
