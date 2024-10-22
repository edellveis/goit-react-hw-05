import { useEffect, useState, Suspense, lazy } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../api/movies.js";
import style from "./MoviesPage.module.css";
const HomePage = lazy(() => import("../HomePage/HomePage.jsx"));

const Movies = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [foundMovies, setFoundMovies] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchWord = searchParams.get("searchTerm");

  useEffect(() => {
    const fetchSearch = async () => {
      if (searchWord === null) {
        return;
      }

      try {
        const data = await searchMovies(searchWord);
        setFoundMovies(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSearch();
  }, [searchWord]);

  const onHandleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm === "") {
      return;
    }
    setSearchParams({ searchTerm });
  };

  return (
    <div>
      <form onSubmit={onHandleSubmit}>
        <input
          className={style.input}
          type="text"
          name="searchMovie"
          value={searchTerm}
          onChange={onHandleChange}
        />
        <button type="submit">Search</button>
      </form>

      <Suspense fallback={<div>Loading...</div>}>
        {foundMovies && <HomePage movies={foundMovies} />}
      </Suspense>
    </div>
  );
};

export default Movies;
