import React, { lazy, useEffect, useState } from "react";
import { getMoviesDay } from "../../api/movies";

const MovieList = lazy(() => import("../../components/MovieList/MovieList"));

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { results } = await getMoviesDay();
        setMovies(results);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>Trending today movies</h1>

      {<MovieList movies={movies} />}
    </main>
  );
}
