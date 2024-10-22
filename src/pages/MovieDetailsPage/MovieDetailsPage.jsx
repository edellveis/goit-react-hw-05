import React, { useEffect, useState, Suspense, lazy } from "react";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useNavigate,
} from "react-router-dom";
import { fetchMovieDetailsbyId } from "../../api/movies";
import style from "./MovieDetailsPage.module.css";

const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../../components/MovieReviews/MovieReviews")
);

export default function MovieDetailsPage({ movies }) {
  const [movi, setMovi] = useState(movies || null);
  const { movieId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const backLink = location.state?.from ?? "/movies";

  useEffect(() => {
    const fetchMove = async (id) => {
      try {
        const results = await fetchMovieDetailsbyId(id);
        setMovi(results);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };
    if (!movies && movieId) {
      fetchMove(movieId);
    }
  }, [movieId, movies]);

  return (
    <>
      <button type="button" onClick={() => navigate(backLink)}>
        Go back
      </button>
      {movi && (
        <>
          <div className={style.box}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movi.backdrop_path}`}
              alt={movi.original_title}
              className={style.img}
            />
            <div className={style.info}>
              <h2>{movi.original_title}</h2>
              <p>
                <span>Data:</span> {movi.release_date}
              </p>
            </div>
            <p>
              <span>Overview:</span> {movi.overview}
            </p>
          </div>

          <nav className={style.nav}>
            <li>
              <Link to="cast" state={{ from: backLink }}>
                Cast
              </Link>
            </li>
            <li>
              <Link to="reviews" state={{ from: backLink }}>
                Reviews
              </Link>
            </li>
          </nav>

          <div className={style.details}>
            <Suspense fallback={<div>Loading...</div>}>
              <Outlet />
            </Suspense>
          </div>
        </>
      )}
    </>
  );
}
