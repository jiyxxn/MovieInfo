const movieCardArea = document.querySelector(".movieCardsArea");
const movieModal = document.getElementById("movieModal");
const modalDimmed = document.querySelector(".dimmed");
const modalContent = document.querySelector("#movieModal .modalContent");

let moviesData = []; // 영화 데이터 담을 곳

// * -------- TMDB API : API request and get -------- //
const fetchMovies = async function () {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGFlNDM4YmY5NjY4NGU5N2JiMGUxMTBmZDQxM2M4NiIsIm5iZiI6MTczNjI5NjA2OC42OTI5OTk4LCJzdWIiOiI2NzdkYzY4NDM4ODFjNzk0MTliYWZjOGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yCGUZDqvdv2YPJOFbuBaHDyWW3MLOh1FPXgxPNvlYjQ",
    },
  };

  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/popular?language=ko&page=2",
      options
    );
    const { results } = await res.json();
    return results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};

// * -------- 영화 정보 뿌리는 함수 -------- //
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

fetchMovies().then((movies) => {
  displayMovies(movies);
});

// * -------- 모달창 내 영화 정보 넣는 함수 -------- //
const displayMovieDetails = function (movie) {
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
      <button type="button" class="btnAddBookmark">북마크에 추가하기</button>
    </div>
    <button type="button" class="btnClose"><i class="fa-solid fa-xmark"></i></button>
  `;
  modalContent.innerHTML = detailsMarkup; // 모달 콘텐츠 업데이트
};

// * -------- 모달창 띄우기 및 영화 정보 표시 -------- //
movieCardArea.addEventListener("click", function (e) {
  const movieCard = e.target.closest("li");

  if (movieCard && movieCardArea.contains(movieCard)) {
    const movieId = movieCard.getAttribute("data-id");
    const movie = moviesData.find((movie) => movie.id == movieId);

    if (movie) {
      displayMovieDetails(movie);
      movieModal.classList.add("active");
    }
  }
});

// * -------- 모달 닫기 -------- //
movieModal.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("dimmed") ||
    (e.target.closest("button") &&
      e.target.closest("button").classList.contains("btnClose"))
  ) {
    movieModal.classList.remove("active");
  }
});
