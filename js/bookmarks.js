import { toastPopup } from "./util/toastPopup.js";
import { toggleBtnState } from "./util/toggleBtnState.js";

let bookmarksData = new Set(); // 북마크 데이터 저장할 Set

// * setInitialBookmarkState()
// |- 모달 창 내 북마크 버튼 상태 초기화
// 실행 : renderMovieModalContent()
export const setInitialBookmarkState = function (button, movieId) {
  const savedBookmarks = localStorage.getItem("bookmark");
  if (savedBookmarks) {
    bookmarksData = new Set(JSON.parse(savedBookmarks));
  }
  if (bookmarksData.has(String(movieId))) {
    toggleBtnState(button, "removeBookmark", "북마크 삭제하기");
  } else {
    toggleBtnState(button, "addBookmark", "북마크에 추가하기");
  }
};

// * toggleBookmark()
// |- 세션 스토리지 내 영화 데이터 유무에 따라 [북마크에 추가 || 삭제]
// 실행 : movieModal.addEventListener("click", function (e))
export const toggleBookmark = function (e) {
  if (e.target.classList.contains("btnHandleBookmark")) {
    let bookmarkMoviesId = e.target.getAttribute("data-id");

    if (bookmarkMoviesId) {
      const savedBookmarks = localStorage.getItem("bookmark");
      if (savedBookmarks) {
        bookmarksData = new Set(JSON.parse(savedBookmarks));
      }

      if (bookmarksData.has(bookmarkMoviesId)) {
        // 북마크에 이미 존재하면 삭제
        bookmarksData.delete(bookmarkMoviesId);
        localStorage.setItem("bookmark", JSON.stringify([...bookmarksData]));
        toastPopup("북마크에서 삭제되었습니다.");
        toggleBtnState(e.target, "addBookmark", "북마크에 추가하기");
      } else {
        // 북마크에 없으면 추가
        bookmarksData.add(bookmarkMoviesId);
        localStorage.setItem("bookmark", JSON.stringify([...bookmarksData]));
        toastPopup("북마크 추가가 완료되었습니다.");
        toggleBtnState(e.target, "removeBookmark", "북마크 삭제하기");
      }
    } else {
      console.log(" error! : not having bookmarkMoviesId");
      toastPopup("북마크가 등록되지 않았습니다.");
    }
  }
  updateBookmarkClasses();
};

// * updateBookmarkClasses()
// |- 세션 스토리지에 등록된 영화에 .bookmarked 추가
// 실행 : loadMoviesWithBookmarks()
export const updateBookmarkClasses = function () {
  const movieCards = document.querySelectorAll(".movieCard");
  const savedBookmarks = localStorage.getItem("bookmark");

  if (savedBookmarks) {
    bookmarksData = new Set(JSON.parse(savedBookmarks));
    const bookmarkList = [...bookmarksData]; // 세션 스토리지에 저장된 북마크 데이터에서 id들만 따로 저장

    movieCards.forEach(function (card) {
      const cardId = card.getAttribute("data-id"); // movieCard의 data-id 값 가져오기

      if (bookmarkList.includes(cardId)) {
        card.classList.add("bookmarked");
      } else {
        card.classList.remove("bookmarked");
      }
    });
  }
};

// * displayBookmarkedMovies()
// |- 북마크 된 영화만 노출
// 실행 : btnToggleBookmark.addEventListener("click", function (e)
export const displayBookmarkedMovies = function () {
  const movieCards = document.querySelectorAll(".movieCard");
  const savedBookmarks = localStorage.getItem("bookmark");

  if (!savedBookmarks || JSON.parse(savedBookmarks).length === 0) {
    return false; // 북마크된 영화가 없음을 알림
  }

  movieCards.forEach(function (card) {
    const isBookmarked = card.classList.contains("bookmarked");
    if (isBookmarked) {
      card.classList.remove("displaynone");
    } else {
      card.classList.add("displaynone");
    }
  });

  return true; // 북마크된 영화가 있음
};

// * showNoBookmarksAlert()
// |- 북마크 된 영화가 없을 경우 알럿 노출 && 버튼 State 유지
export const showNoBookmarksAlert = function (button) {
  toastPopup("북마크된 영화가 없습니다.");
  toggleBtnState(button, "showBookmark", "북마크 보기");
};
