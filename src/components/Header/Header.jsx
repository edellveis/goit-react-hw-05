import clsx from "clsx";
import { NavLink } from "react-router-dom";
import style from "./Header.module.css";

const buildCssClasses = ({ isActive }) =>
  clsx(style.link, isActive && style.active);

const HomePage = () => {
  return (
    <header className={style.header}>
      <NavLink className={buildCssClasses} to="/">
        Home
      </NavLink>
      <NavLink className={buildCssClasses} to="/movies">
        Movies
      </NavLink>
    </header>
  );
};
export default HomePage;
