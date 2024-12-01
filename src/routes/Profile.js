// src/routes/Profile.js

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { badgeIcons, skillIcons } from "../data/mappings";
import "./css/Profile.css";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={user.profileImage} alt="Profile" className="profile-image" />
        <h1 className="profile-id">{user.id}</h1>
        <button
          className="edit-button"
          onClick={() => navigate("/profile/edit")}
        >
          정보 수정
        </button>
      </div>

      <div className="info-sections">
        <div className="badges-section">
          <h3>획득 배지</h3>
          <div className="badges">
            {user.badges.map((badge, index) => (
              <span key={index} className="badge">
                {badgeIcons[badge] || "🏅"}
              </span>
            ))}
          </div>
        </div>

        <div className="stack-section">
          <h3>스택</h3>
          <div className="stack-icons">
            {user.skills.map((skill, index) => (
              <div key={index} className="stack-icon">
                {skillIcons[skill] ? (
                  <img
                    src={skillIcons[skill]}
                    alt={skill}
                    className="skill-image"
                  />
                ) : (
                  <span>{skill}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="contributions">
        <h3>{user.githubId}의 GitHub Contributions</h3>
        <img
          src={`https://ghchart.rshah.org/33333/${user.githubId}`}
          alt={`${user.githubId}'s GitHub Contributions`}
          className="contribution-chart"
        />
      </div>
    </div>
  );
};
export default Profile;
