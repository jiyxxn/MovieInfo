import {
  toggleBookmark,
  displayBookmarkedMovies,
  showNoBookmarksAlert,
  updateBookmarkClasses,
} from "./bookmarks.js";
import { fetchMovies } from "./api/moviesApi.js";
import {
  renderMovieCards,
  renderMovieModalContent,
} from "./component/renderMovies.js";
import { debounceFunc } from "./util/debounce.js";
import { toggleBtnState } from "./util/toggleBtnState.js";

const DEFAULT_MOVIE_API_URL =
  "https://api.themoviedb.org/3/movie/popular?include_adult=false&language=ko&page=2";

const movieCardArea = document.querySelector(".movieCardsArea"); // 영화 카드 뿌려질 영역
const movieModal = document.getElementById("movieModal"); // 모달
const searchInput = document.getElementById("searchText"); // 검색창 인풋 박스
const btnToggleBookmark = document.querySelector(".btnToggleBookmark"); // 북마크 보기 or 목록으로 돌아가기 버튼

let moviesData = []; // 영화 데이터 담을 곳

// *
// * 영화 API 렌더링
// *
const loadMoviesWithBookmarks = function (url) {
  fetchMovies(url)
    .then((movies) => {
      moviesData = movies; // 전체 영화 데이터를 저장
      renderMovieCards(movies);
      updateBookmarkClasses(); // 세션 스토리지에 저장된 영화에 북마크 클래스 적용
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
};

loadMoviesWithBookmarks(DEFAULT_MOVIE_API_URL); // 영화 API 렌더 최초 실행

// *
// * Functions()
// *

// * openMovieModal()
// | - 모달창 띄우기 movieCardArea.addEventListener("click", function (e))
const openMovieModal = function (e) {
  const movieCard = e.target.closest("li");

  if (movieCard && movieCardArea.contains(movieCard)) {
    const movieId = movieCard.getAttribute("data-id");
    const matchedMovie = moviesData.find((movie) => movie.id == movieId);

    if (matchedMovie) {
      renderMovieModalContent(matchedMovie);
      movieModal.classList.add("active");
    }
  }
};

// * closeMovieModal()
// | - 모달창 닫기 movieModal.addEventListener("click", function (e))
const closeMovieModal = function (e) {
  if (
    e.target.classList.contains("dimmed") ||
    (e.target.closest("button") &&
      e.target.closest("button").classList.contains("btnClose"))
  ) {
    movieModal.classList.remove("active");
  }
};

// * searchMovies()
// | - 영화 검색 searchInput.addEventListener("input", function ())에서 실행
const searchMovies = function (searchKeyword) {
  debounceFunc(function () {
    let searchApiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ko&page=1`;

    loadMoviesWithBookmarks(searchApiUrl);
  }, 300);
};

// *
// * 이벤트 리스너 && 기능별 함수 실행 구좌
// *
movieCardArea.addEventListener("click", function (e) {
  openMovieModal(e); // 카드 리스트 클릭 시 모달창 open
});

movieModal.addEventListener("click", function (e) {
  closeMovieModal(e); // close 버튼 or 딤 영역 클릭 시 모달 close
  toggleBookmark(e); // 모달 내 북마크에 추가/삭제하기 버튼 클릭 시 로컬 스토리지에 북마크 추가 or 삭제
});

btnToggleBookmark.addEventListener("click", function (e) {
  let btnState = e.target.getAttribute("data-state");

  if (btnState === "showBookmark") {
    const hasBookmarks = displayBookmarkedMovies();
    if (!hasBookmarks) {
      showNoBookmarksAlert(e.target); // 북마크가 없을 때 처리
      return;
    }
    toggleBtnState(e.target, "showDefaultList", "목록으로 돌아가기");
  } else if (btnState === "showDefaultList") {
    toggleBtnState(e.target, "showBookmark", "북마크 보기");
    loadMoviesWithBookmarks(DEFAULT_MOVIE_API_URL);
  }
});

searchInput.addEventListener("input", function () {
  // 검색 이벤트
  const searchKeyword = searchInput.value.trim().toLowerCase();

  if (searchKeyword === "") {
    debounceFunc(function () {
      loadMoviesWithBookmarks(DEFAULT_MOVIE_API_URL);
    }, 300);
  } else {
    searchMovies(searchKeyword);
  }
});

// *
// * Auto Focus
// *
window.addEventListener("load", function () {
  searchInput.focus();
});
