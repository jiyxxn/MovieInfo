import { toastPopup } from "./util/toastPopup.js";
import { toggleBtnState } from "./util/toggleBtnState.js";

let bookmarksData = new Set(); // 북마크 데이터 저장할 Set

// * addBookmarksToSession()
// | - [북마크에 추가하기] 클릭 시 세션 스토리지에 영화 id 추가
export const addBookmarksToSession = function (e) {
  if (e.target.classList.contains("btnAddBookmark")) {
    let bookmarkMoviesId = e.target.getAttribute("data-id");

    if (bookmarkMoviesId) {
      bookmarksData.add(bookmarkMoviesId);
      sessionStorage.setItem("bookmark", JSON.stringify([...bookmarksData]));
      toastPopup("북마크 추가가 완료되었습니다.");
    } else {
      console.log(" error! : not having bookmarkMoviesId");
      toastPopup("북마크가 등록되지 않았습니다.");
    }
  }
  loadBookmarks();
};

// * loadBookmarks()
// | - 세션 스토리지에 등록된 영화에 .bookmarked 추가
export const loadBookmarks = function () {
  const movieCards = document.querySelectorAll(".movieCard");
  const savedBookmarks = sessionStorage.getItem("bookmark");

  if (savedBookmarks) {
    bookmarksData = new Set(JSON.parse(savedBookmarks));
    const bookmarkList = [...bookmarksData]; // 세션 스토리지에 저장된 북마크 데이터에서 id들만 따로 저장

    movieCards.forEach(function (card) {
      const cardId = card.getAttribute("data-id"); // movieCard의 data-id 값 가져오기

      if (bookmarkList.includes(cardId)) {
        card.classList.add("bookmarked");
      }
    });
  }
};

// * showingBookmarkedMovies()
// | - 북마크 된 영화만 노출
export const showingBookmarkedMovies = function () {
  const movieCards = document.querySelectorAll(".movieCard");
  const savedBookmarks = sessionStorage.getItem("bookmark");

  if (!savedBookmarks || JSON.parse(savedBookmarks).length === 0) {
    // 세션 스토리지에 북마크 데이터가 없을 경우
    toastPopup("북마크된 영화가 없습니다.");
    toggleBtnState(e, "showBookmark", "북마크 보기"); // 북마크 보기 버튼으로 현상 유지
    return;
  }
  movieCards.forEach(function (card) {
    const isBookmarked = card.classList.contains("bookmarked"); // movieCard의 data-id 값 가져오기

    if (isBookmarked) {
      card.classList.remove("displaynone");
    } else {
      card.classList.add("displaynone");
    }
  });
};
