import { Link, useLocation } from "react-router-dom";
import style from "./MovieList.module.css";

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <div>
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
    </div>
  );
}
