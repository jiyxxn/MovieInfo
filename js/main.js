import {
  addBookmarksToSession,
  showingBookmarkedMovies,
  loadBookmarks,
} from "./bookmarks.js";
import { fetchMovies } from "./moviesApi.js";
import { debounceFunc } from "./util/debounce.js";
import { toggleBtnState } from "./util/toggleBtnState.js";

const DEFAULT_API_URL =
  "https://api.themoviedb.org/3/movie/popular?include_adult=false&language=ko&page=2";

const movieCardArea = document.querySelector(".movieCardsArea"); // 영화 카드 뿌려질 영역
const movieModal = document.getElementById("movieModal"); // 모달
const searchInput = document.getElementById("searchText"); // 검색창 인풋 박스
const btnToggleBookmark = document.querySelector(".btnToggleBookmark"); // 북마크 보기 버튼

let moviesData = []; // 영화 데이터 담을 곳

// *
// * 영화 API 렌더링
// *
const getMoviesAndShow = function (url) {
  fetchMovies(url)
    .then((movies) => {
      displayMovies(movies);
      loadBookmarks(); // 북마크 로딩 최초 실행
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
};

getMoviesAndShow(DEFAULT_API_URL); // 영화 API 렌더 최초 실행

// *
// * Functions()
// *

// * displayMovies()
// | - 영화 정보 뿌리기
const displayMovies = function (movies) {
  moviesData = movies; // 전체 영화 데이터를 저장

  movieCardArea.innerHTML = ""; // 기존 영화 카드 초기화
  let cardMarkup = "";
  movies.forEach((movie) => {
    cardMarkup += `
      <li data-id="${movie.id}" class="movieCard">
        <div class="thumbnail">
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        </div>
        <div class="movieInfo">
          <p class="title">${movie.title}</p>
          <span class="rating">${movie.vote_average}</span>
        </div>
      </li>
    `;
  });
  movieCardArea.innerHTML = cardMarkup;
};

// * openModal()
// | - 모달창 띄우기 movieCardArea.addEventListener("click", function (e))
const openModal = function (e) {
  const movieCard = e.target.closest("li");

  if (movieCard && movieCardArea.contains(movieCard)) {
    const movieId = movieCard.getAttribute("data-id");
    const matchedMovie = moviesData.find((movie) => movie.id == movieId);

    if (matchedMovie) {
      renderMovieDetails(matchedMovie);
      movieModal.classList.add("active");
    }
  }
};

// * closeModal()
// | - 모달창 닫기 movieModal.addEventListener("click", function (e))
const closeModal = function (e) {
  if (
    e.target.classList.contains("dimmed") ||
    (e.target.closest("button") &&
      e.target.closest("button").classList.contains("btnClose"))
  ) {
    movieModal.classList.remove("active");
  }
};

// * renderMovieDetails()
// | - 모달 창 내 영화 정보 넣기 openModal()에서 실행
const renderMovieDetails = function (movie) {
  const detailsMarkup = `
    <div class="thumbnail">
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${
    movie.title
  }">
    </div>
    <div class="bottomWrap">
    <div class="movieInfo">
      <p class="title">${movie.title}</p>
      <p class="description">${movie.overview || "준비중"}</p>
      <span class="releaseDate">개봉 일자 : ${movie.release_date}</span>
      <span class="rating">평점 : ${movie.vote_average}</span>
      <button type="button" class="btnAddBookmark" data-id="${
        movie.id
      }">북마크에 추가하기</button>
    </div>
    <button type="button" class="btnClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  document.querySelector(".modalContent").innerHTML = detailsMarkup; // 모달 콘텐츠 업데이트
};

// * searchMovies()
// | - 영화 검색 searchInput.addEventListener("input", function ())에서 실행
const searchMovies = function (searchKeyword) {
  debounceFunc(function () {
    let searchApiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ko&page=1`;

    getMoviesAndShow(searchApiUrl);
  }, 300);
};

// *
// * 이벤트 리스너 && 기능별 함수 실행 구좌
// *
movieCardArea.addEventListener("click", function (e) {
  openModal(e); // 카드 리스트 클릭 시 모달창 open
});

movieModal.addEventListener("click", function (e) {
  closeModal(e); // close 버튼 or 딤 영역 클릭 시 모달 close
  addBookmarksToSession(e); // 모달 내 북마크에 추가하기 버튼 클릭 시 세션 스토리지에 북마크 추가
});

btnToggleBookmark.addEventListener("click", function (e) {
  // Default : '북마크 보기' 버튼 클릭
  let btnState = e.target.getAttribute("data-state");

  // 버튼 토글 디폴트 로직
  if (btnState === "showBookmark") {
    showingBookmarkedMovies();
    toggleBtnState(e, "showDefalutList", "목록으로 돌아가기");
  } else if (btnState === "showDefalutList") {
    getMoviesAndShow(DEFAULT_API_URL);
    toggleBtnState(e, "showBookmark", "북마크 보기");
  }
});

searchInput.addEventListener("input", function () {
  // 검색 이벤트
  const searchKeyword = searchInput.value.trim().toLowerCase();

  if (searchKeyword === "") {
    debounceFunc(function () {
      getMoviesAndShow(DEFAULT_API_URL);
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
