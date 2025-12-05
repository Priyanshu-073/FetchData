import React, { useState } from 'react';
import UserCard from './UserCard';

const Sidebar = ({ users, onAddPost, onAddUser }) => {
    const [newTitle, setNewTitle] = useState("");
    const [newBody, setNewBody] = useState("");
    const [newUser, setNewUser] = useState("");
    const [newEmail, setNewEmail] = useState("");

    const handleAddPostSubmit = () => {
        if (!newTitle.trim() || !newBody.trim()) return;
        onAddPost({ title: newTitle, body: newBody });
        setNewTitle("");
        setNewBody("");
    };

    const handleAddUserSubmit = () => {
        if (!newUser.trim() || !newEmail.trim()) return;
        onAddUser({ name: newUser, email: newEmail });
        setNewUser("");
        setNewEmail("");
    };

    return (
        <aside className="sidebar">
            <section className="create-section">
                <h2>Create New Post</h2>
                <div className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                    />
                    <textarea
                        className="form-textarea"
                        placeholder="What's on your mind?"
                        value={newBody}
                        onChange={(e) => setNewBody(e.target.value)}
                    ></textarea>
                    <button className="btn primary full-width" onClick={handleAddPostSubmit}>
                        Publish Post
                    </button>
                </div>
            </section>

            <section className="create-section">
                <h2>Add New User</h2>
                <div className="form-group">
                    <input
                        className="form-input"
                        type="text"
                        placeholder="Name"
                        value={newUser}
                        onChange={(e) => setNewUser(e.target.value)}
                    />
                    <input
                        className="form-input"
                        type="email"
                        placeholder="Email address"
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                    />
                    <button className="btn secondary full-width" onClick={handleAddUserSubmit}>
                        Add User
                    </button>
                </div>
            </section>

            <section className="users-list">
                <div className="section-header">
                    <h2>Community Members</h2>
                    <span className="badge">{users.length}</span>
                </div>
                <div className="users-grid">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            </section>
        </aside>
    );
};

export default Sidebar;
