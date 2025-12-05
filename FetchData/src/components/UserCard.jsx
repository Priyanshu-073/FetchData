import React from 'react';

const UserCard = ({ user }) => {
    return (
        <div className="user-card">
            <div className="user-avatar">
                {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
                <h3>{user.name}</h3>
                <p className="user-email">{user.email}</p>
            </div>
        </div>
    );
};

export default UserCard;
