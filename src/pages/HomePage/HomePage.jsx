import React, { useEffect, useState } from "react";
import { getMoviesDay } from "../../api/movies";
import { Link, useLocation } from "react-router-dom";

import style from "./HomePage.module.css";
export default function HomePage({ movies: initialMovies }) {
  const [movies, setMovies] = useState(initialMovies || []);
  const [errorMessage, setErrorMessage] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { results } = await getMoviesDay();
        setMovies(results);
      } catch (error) {
        setErrorMessage(error.message);
      }
    };

    if (!initialMovies) {
      fetchData();
    }
  }, [initialMovies]);

  return (
    <main>
      {errorMessage && (
        <p>
          Whoops <br />
          <span>{errorMessage}</span>
        </p>
      )}
      {movies && (
        <ul className={style.list}>
          {movies.map((item) => (
            <li key={item.id} className={style.item}>
              <Link to={`/movies/${item.id}`} state={{ from: location }}>
                {item.title || item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
