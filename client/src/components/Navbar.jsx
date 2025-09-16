import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import "../styles/navbar.css";

export default function Navbar() {
  const [theme, setTheme] = useState("dark");
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  const handleLogOut = ()=>{
    localStorage.clear()
    navigate('/')
  }
  return (
    <nav className="navbar">
      {/* Logo / App Name */}
      <div className="navbar-logo">
        <h2>ChitChat</h2>
      </div>

      <ul className="navbar-links">
        {user ? (
          // Render these links if a user is logged in
          <>
            <li>
              <Link to={`/profile/${user.username}`}>Profile</Link>
            </li>
            <li>
              <Link to="/create">Create</Link>
            </li>
            <li>
              <button onClick={handleLogOut} >Log out</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </>
        )}
      </ul>

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </nav>
  );
}