const toastMessage = document.querySelector(".toastMessage");
const messageParagraph = document.createElement("p"); // <p> 태그 생성

let toastTimer;

// * toastPopup()
// | - 토스트 팝업 유틸리티
export const toastPopup = function (message) {
  if (toastTimer) {
    clearTimeout(toastTimer);
  }
  messageParagraph.innerText = message; // 인자로 받은 message 출력
  toastMessage.appendChild(messageParagraph);

  toastMessage.classList.add("active");

  toastTimer = setTimeout(function () {
    toastMessage.classList.remove("active");
  }, 1000);
};
