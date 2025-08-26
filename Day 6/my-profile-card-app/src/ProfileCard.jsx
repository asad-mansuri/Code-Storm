import React from 'react';

const ProfileCard = ({ name, photo, role, bio, location }) => {
  return (
    <div className="profile-card">
      <div className="profile-header">
        <img 
          src={photo} 
          alt={`${name}'s profile`} 
          className="profile-photo"
        />
        <div className="profile-info">
          <h2 className="profile-name">{name}</h2>
          <p className="profile-role">{role}</p>
          {location && <p className="profile-location">📍 {location}</p>}
        </div>
      </div>
      {bio && (
        <div className="profile-bio">
          <p>{bio}</p>
        </div>
      )}
      <div className="profile-stats">
        <div className="stat">
          <span className="stat-number">124</span>
          <span className="stat-label">Projects</span>
        </div>
        <div className="stat">
          <span className="stat-number">2.5k</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat">
          <span className="stat-number">180</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;