import { fetchMovieSearchReviews } from "../../api/movies";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "./MovieReviews.module.css";
export default function MovieReviews() {
  const [movieReviews, setMovieReviews] = useState([]);

  const { movieId } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        const results = await fetchMovieSearchReviews(movieId);

        setMovieReviews(results);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      {movieReviews.length > 0 ? (
        <ul className={style.list}>
          {movieReviews.map((item) => (
            <li key={item.id}>
              {item.author_details.avatar_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.author_details.avatar_path}`}
                  alt="Author Avatar"
                  width="100px"
                />
              )}
              <h4>Author: {item.author}</h4>
              <p>{item.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available for this movie.</p>
      )}
    </>
  );
}
