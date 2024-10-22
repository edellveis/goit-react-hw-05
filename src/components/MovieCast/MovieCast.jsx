import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieCast } from "../../api/movies";
import style from "./MovieCast.module.css";

export default function MovieCast() {
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const results = await fetchMovieCast(movieId);

        setCast(results);
      } catch (error) {
        console.log("Error fetching cast:", error);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h3>Cast</h3>

      {cast && (
        <ul className={style.list}>
          {cast.map((actor) => (
            <li key={actor.id} className={style.item}>
              {actor.profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                  alt={actor.name}
                  width={100}
                />
              )}
              <h4>{actor.name}</h4>
              <p>Character: {actor.character}</p>
              <p>Popularity: {actor.popularity}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
