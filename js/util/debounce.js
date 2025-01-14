let debounceTimeout; // 디바운스 세팅

// * debounceFunc()
// | - 디바운싱 유틸리티
export const debounceFunc = function (callback, delay) {
  clearTimeout(debounceTimeout);

  debounceTimeout = setTimeout(callback, delay);
};
