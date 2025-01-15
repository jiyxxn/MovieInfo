import { setInitialBookmarkState } from "../bookmarks.js";

const movieCardArea = document.querySelector(".movieCardsArea"); // 영화 카드 뿌려질 영역

// * renderMovieCards()
// | - 영화 카드 UI 렌더링
export const renderMovieCards = function (movies) {
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

// * renderMovieModalContent()
// | - 모달 창 내 영화 상세 정보 렌더링 openMovieModal()에서 실행
export const renderMovieModalContent = function (movie) {
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
      <button type="button" class="btnHandleBookmark" data-id="${
        movie.id
      }">북마크에 추가하기</button>
    </div>
    <button type="button" class="btnClose"><i class="fa-solid fa-xmark"></i></button>
    </div>
  `;

  document.querySelector(".modalContent").innerHTML = detailsMarkup; // 모달 콘텐츠 업데이트

  let btnHandleBookmark = document.querySelector(".btnHandleBookmark");

  setInitialBookmarkState(btnHandleBookmark, movie.id); // 북마크 상태에 따른 버튼 state 초기화
};
