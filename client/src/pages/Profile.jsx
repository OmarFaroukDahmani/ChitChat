import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/profile.css";

export default function Profile() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");
  const navigate = useNavigate();

  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);

  useEffect(() => {
    if (!user) {
      navigate("/");
      return;
    }

    const fetchPosts = async () => {
      try {
        const response = await fetch(`http://localhost:8000/getposts/${user.id}`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user, navigate]);

  // === Edit Profile ===
  const handleEditProfile = async () => {
    try {
      const response = await fetch(`http://localhost:8000/edit-profile/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error editing profile:", error);
    }
  };

  // === Add Post ===
  const handleAddPost = async () => {
    if (!newPost.trim()) return;

    try {
      const response = await fetch("http://localhost:8000/addpost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: user.id, content: newPost }),
      });
      const data = await response.json();
      setPosts([...posts, data]);
      setNewPost("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  // === Edit Post ===
  const handleEditPost = async (postId, updatedContent) => {
    try {
      const response = await fetch(`http://localhost:8000/editpost/${postId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: updatedContent }),
      });
      const data = await response.json();

      setPosts(posts.map((post) => (post.id === postId ? { ...post, content: updatedContent } : post)));
      console.log("Post updated:", data);
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  // === Delete Post ===
  const handleDeletePost = async (postId) => {
    try {
      await fetch(`http://localhost:8000/deletepost/${postId}`, { method: "DELETE" });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="profile-container">
      <header className="profile-header">
        <h2 className="profile-username">{user.username}</h2>
        <h3 className="profile-name">{user.name}</h3>
        <button className="edit-profile-btn" onClick={handleEditProfile}>
          Edit Profile
        </button>
      </header>

      <main className="profile-main">
        <div className="add-post-container">
          <textarea
            className="add-post-input"
            placeholder="What's on your mind?"
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <button className="add-post-btn" onClick={handleAddPost}>
            Add Post
          </button>
        </div>

        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <p className="post-content">{post.content}</p>
              <p className="post-date">{post.created_at}</p>
              <div className="post-actions">
                <button
                  className="edit-btn"
                  onClick={() => {
                    const updatedContent = prompt("Edit your post:", post.content);
                    if (updatedContent) handleEditPost(post.id, updatedContent);
                  }}
                >
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeletePost(post.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts">No posts yet.</p>
        )}
      </main>
    </div>
  );
}
