import React, { useEffect, useState } from 'react';
import './App.css';
import PostCard from './components/PostCard';
import Sidebar from './components/Sidebar';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  // Initial Data Fetching
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsRes, usersRes] = await Promise.all([
          fetch("https://jsonplaceholder.typicode.com/posts"),
          fetch("https://jsonplaceholder.typicode.com/users")
        ]);

        const postsData = await postsRes.json();
        const usersData = await usersRes.json();

        setPosts(postsData);
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Post Operations
  const handleAddPost = (newPostData) => {
    const newPost = {
      ...newPostData,
      userId: 1
    };

    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPost)
    })
      .then((res) => res.json())
      .then((data) => {
        // API returns ID 101 for all new posts, so we might get duplicates keys if we don't handle it.
        // For this demo, we'll just use a random ID or the one from API if unique.
        const postWithUniqueId = { ...data, id: Date.now() };
        setPosts([postWithUniqueId, ...posts]);
        // alert("Post Published Successfully!");
      });
  };

  const handleUpdatePost = (id, updatedData) => {
    const updatedPost = {
      ...updatedData,
      id,
      userId: 1
    };

    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(updatedPost)
    })
      .then((res) => res.json())
      .then((data) => {
        setPosts(posts.map((p) => (p.id === id ? { ...p, ...updatedData } : p)));
        // alert("Post Updated!");
      });
  };

  const handleDeletePost = (id) => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, { method: "DELETE" })
      .then(() => {
        setPosts(posts.filter((post) => post.id !== id));
        // alert("Post Deleted");
      })
      .catch(() => alert("Failed to delete"));
  };

  // User Operations
  const handleAddUser = (newUserData) => {
    fetch("https://jsonplaceholder.typicode.com/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData)
    })
      .then((res) => res.json())
      .then((data) => {
        const userWithUniqueId = { ...data, id: Date.now() };
        setUsers([userWithUniqueId, ...users]);
        // alert("User Added Successfully");
      });
  };

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase()) ||
    post.body.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h2>Loading content...</h2>
      </div>
    );
  }

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="header-content">
          <div className="brand">
            <div className="logo-mark">F</div>
            <div className="title-wrap">
              <h1>FetchData</h1>
              <p className="subtitle">Manage your posts and community</p>
            </div>
          </div>
          <div className="search-bar">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="search-icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </header>

      <main className="app-main">
        <section className="feed-section">
          <div className="feed-header">
            <h2>Latest Posts</h2>
            <span className="badge">{filteredPosts.length} results</span>
          </div>

          <div className="posts-list">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={handleDeletePost}
                  onUpdate={handleUpdatePost}
                />
              ))
            ) : (
              <div className="empty-state">
                <p>No posts found matching your search.</p>
              </div>
            )}
          </div>
        </section>

        <Sidebar
          users={users}
          onAddPost={handleAddPost}
          onAddUser={handleAddUser}
        />
      </main>
    </div>
  );
};

export default App;