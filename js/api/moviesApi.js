// * -------- TMDB API : API request and get -------- //
export const fetchMovies = async function (url) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZGFlNDM4YmY5NjY4NGU5N2JiMGUxMTBmZDQxM2M4NiIsIm5iZiI6MTczNjI5NjA2OC42OTI5OTk4LCJzdWIiOiI2NzdkYzY4NDM4ODFjNzk0MTliYWZjOGUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yCGUZDqvdv2YPJOFbuBaHDyWW3MLOh1FPXgxPNvlYjQ",
    },
  };

  try {
    const res = await fetch(url, options);
    const { results } = await res.json();
    return results;
  } catch (err) {
    console.error("Error fetching movies:", err);
    return [];
  }
};
