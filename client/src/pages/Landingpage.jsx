import { useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"
import "../styles/Landingpage.css"  
import Navbar from "../components/Navbar"

export default function Landingpage() {
  const [log, setLog] = useState("signup")
  const [message, setMessage] = useState("")
  const [signup, setSignup] = useState({
    name: "",
    username: "",
    email: "",
    password: ""
  })
  const [login, setLogin] = useState({
    userid: "",
    password: ""
  })

  const navigate = useNavigate()

    const [stats, setStats] = useState({ userCount: 0, packageCount: 0 });

  useEffect(() => {
    fetch("http://localhost:8000/stats")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to fetch stats:", err));
  }, []);


  const handleSignUp = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8000/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error || "Signup failed")
        return
      }
      setMessage("Signup successful! Please log in.")
      setLog("login")
    } catch (error) {
      setMessage(error.message)
    }
  }

  const handleLogIn = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login),
      })
      const data = await response.json()

      if (!response.ok) {
        setMessage(data.error || "Login failed")
        return
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      navigate("/feed")
    } catch (error) {
      setMessage(error.message)
    }
  }

  return (
    <>
    <Navbar/>
    <div className="landing-container">
      <header className="landing-header">
        <h1 className="logo">ChitChat</h1>
        <p className="tagline">Where you can talk and share your opinion freely</p>
      </header>

      <main className="landing-main">
        <aside className="form-section">
          <div className="toggle-buttons">
            <button
              className={`toggle-btn ${log === "signup" ? "active" : ""}`}
              onClick={() => setLog("signup") && setMessage(" ")}
            >
              Sign Up
            </button>
            <button
              className={`toggle-btn ${log === "login" ? "active" : ""}`}
              onClick={() => setLog("login") && setMessage(" ")}
            >
              Log In
            </button>
          </div>

          {log === "signup" && (
            <form className="form signup-form" onSubmit={handleSignUp}>
              <input
                type="text"
                placeholder="Full Name"
                onChange={(e) => setSignup({ ...signup, name: e.target.value })}
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setSignup({ ...signup, username: e.target.value })}
              />
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setSignup({ ...signup, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setSignup({ ...signup, password: e.target.value })}
              />
              <p className="message">{message}</p>
              <button className="submit-btn">Sign Up</button>
            </form>
          )}

          {log === "login" && (
            <form className="form login-form" onSubmit={handleLogIn}>
              <input
                type="text"
                placeholder="Username / Email" 
                onChange={(e) => setLogin({ ...login, userid: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setLogin({ ...login, password: e.target.value })}
              />
              <p className="message">{message}</p>
              <button className="submit-btn">Login</button>
            </form>
          )}
        </aside>

        <div className="image-section">
          <img
            src="/chat-illustration.png"
            alt="Chat Illustration"
            className="landing-image"
          />
        </div>
      </main>
    </div>
    </>
  )
}
