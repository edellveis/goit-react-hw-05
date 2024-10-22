import axios from "axios";

const moviesInstanse = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3NDhiZjMwMjE1NzBiOGU3NjdiOWViOTNhMDYxOWQzYiIsIm5iZiI6MTcyOTQ0ODE4OS4zMjc3MjgsInN1YiI6IjY3MTUyZjAwOTlmMjJmMzI2YWFkOTg5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FMVCfl4NafrEBD2LjueC-5UE6XS70a75q0EoNW65bNA",
  },
  params: {
    language: "en-US",
  },
});

export const getMoviesDay = async (params) => {
  const { data } = await moviesInstanse.get("/trending/movie/day", {
    params,
  });
  return data;
};
export const fetchMovieDetailsbyId = async (id) => {
  const { data } = await moviesInstanse.get(`/movie/${id}`);
  return data;
};

export const searchMovies = async (searchWord) => {
  const options = {
    params: { query: `${searchWord}`, page: 1 },
  };
  const { data } = await moviesInstanse.get("/search/movie", options);
  return data.results;
};
export const fetchMovieCast = async (id) => {
  const { data } = await moviesInstanse.get(`/movie/${id}/credits`);
  return data.cast;
};

export const fetchMovieSearchReviews = async (id) => {
  const { data } = await moviesInstanse.get(`/movie/${id}/reviews`);
  return data.results;
};
