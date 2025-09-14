import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar'
import '../styles/home.css'

const formatPostDate = (postDateString) => {
  const postDate = new Date(postDateString);
  const now = new Date();

  const diffInMs = now.getTime() - postDate.getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;

  if (diffInMs > oneDayInMs) {
    return postDate.toLocaleDateString();
  } else {
    return postDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  let user = null;
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (error) {
      console.error("Failed to parse user from localStorage:", error);
    }
  }

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/getUsers");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  // Fetch posts
  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch("http://localhost:8000/getposts");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user, navigate]);

  // Build userMap for quick lookup
  const userMap = users.reduce((map, u) => {
    map[u.id] = u.username;
    return map;
  }, {});

  return (
    <>
    <Navbar/>
    <div className="feed-container">
      {Array.isArray(posts) && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.id} className="post-card">
            <div className="post-header">
              <h3 className="post-username">{userMap[post.user_id] || "Unknown User"}</h3>
              <button className="follow-btn">Follow</button>
            </div>

            <p className="post-content">{post.content}</p>
            <p className="post-date">{formatPostDate(post.created_at)}</p>
          </div>
        ))
      ) : (
        <p className="no-posts">No posts to display.</p>
      )}
    </div>
    </>
  );
}
