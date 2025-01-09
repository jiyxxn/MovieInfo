import { addBookmarksToSession, showingBookmarkedMovies } from "./bookmarks.js";
import { fetchMovies } from "./moviesApi.js";

const movieCardArea = document.querySelector(".movieCardsArea"); // 영화 카드 뿌려질 영역
const movieModal = document.getElementById("movieModal"); // 모달
const searchInput = document.getElementById("searchText"); // 검색창 인풋 박스
const btnShowBookmark = document.querySelector(".btnToBookmark"); // 북마크 보기 버튼

let movieListUrl =
  "https://api.themoviedb.org/3/movie/popular?language=ko&page=2"; // 기본 영화 리스트 URL
let moviesData = []; // 영화 데이터 담을 곳
let debounceTimeout; // 디바운스 세팅

// *
// * Functions()
// *

// * displayMovies()
// | - 영화 정보 뿌리기
const displayMovies = function (movies) {
  moviesData = movies; // 전체 영화 데이터를 저장
  movies.forEach((movie) => {
    const cardMarkup = `
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
    movieCardArea.innerHTML += cardMarkup;
  });
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
  `;

  document.querySelector(".modalContent").innerHTML = detailsMarkup; // 모달 콘텐츠 업데이트
};

// * searchMovies()
// | - 영화 검색 searchInput.addEventListener("input", function ())에서 실행
const searchMovies = function () {
  clearTimeout(debounceTimeout);

  let searchKeyword = searchInput.value.trim();

  debounceTimeout = setTimeout(async function () {
    movieListUrl =
      searchKeyword.length > 0
        ? `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ko&page=1`
        : "https://api.themoviedb.org/3/movie/popular?language=ko&page=2";

    const movies = await fetchMovies(movieListUrl);
    movieCardArea.innerHTML = ""; // 기존 영화 카드 초기화
    displayMovies(movies); // 영화 데이터 다시 렌더링
  }, 300);
};

// *
// * 영화 API 최초 렌더링
// *
fetchMovies(movieListUrl).then((movies) => {
  displayMovies(movies);
});

// *
// * 이벤트 리스너 && 기능별 함수 실행 구좌
// *
movieCardArea.addEventListener("click", function (e) {
  openModal(e);
});
movieModal.addEventListener("click", function (e) {
  closeModal(e);
  addBookmarksToSession(e);
});
btnShowBookmark.addEventListener("click", function () {
  showingBookmarkedMovies();
});
searchInput.addEventListener("input", function () {
  searchMovies();
});
