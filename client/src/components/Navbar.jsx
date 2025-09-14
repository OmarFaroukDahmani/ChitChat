import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { FaMoon, FaSun } from "react-icons/fa"
import "../styles/navbar.css"

export default function Navbar() {
  const [theme, setTheme] = useState("dark") // 🌙 default theme = dark

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <nav className="navbar">
      {/* Logo / App Name */}
      <div className="navbar-logo">
        <h1>ChitChat</h1>
      </div>

      {/* Nav Links */}
      <ul className="navbar-links">
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Theme Toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? <FaMoon /> : <FaSun />}
      </button>
    </nav>
  )
}
