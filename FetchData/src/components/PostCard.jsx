import React, { useState } from 'react';

const PostCard = ({ post, onDelete, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(post.title);
    const [editBody, setEditBody] = useState(post.body);

    const handleSave = () => {
        onUpdate(post.id, { title: editTitle, body: editBody });
        setIsEditing(false);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditTitle(post.title);
        setEditBody(post.body);
    };

    return (
        <div className="post-card">
            {isEditing ? (
                <div className="post-edit-mode">
                    <input
                        type="text"
                        className="edit-input"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        autoFocus
                    />
                    <textarea
                        className="edit-textarea"
                        value={editBody}
                        onChange={(e) => setEditBody(e.target.value)}
                    />
                    <div className="card-actions">
                        <button className="btn primary" onClick={handleSave}>Save</button>
                        <button className="btn secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                </div>
            ) : (
                <>
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-body">{post.body}</p>
                    <div className="card-actions">
                        <button className="btn outline" onClick={() => setIsEditing(true)}>Edit</button>
                        <button className="btn danger" onClick={() => onDelete(post.id)}>Delete</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PostCard;
