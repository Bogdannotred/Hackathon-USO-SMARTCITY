import { useState } from "react";
import "./Header.css";

interface User {
  name: string;
  email: string;
  avatar: string;
}

const Header = () => {
  const [user] = useState<User>({
    name: "Bogdan",
    email: "Bogdyrosut@gmail.com",
    avatar:
      "https://images.pexels.com/photos/4098343/pexels-photo-4098343.jpeg",
  });

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-container">
          <svg className="logo-icon" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"
            />
          </svg>
          <div className="logo-text">Wild Park</div>
        </div>
        <div className="profile-container">
          <div className="profile-wrapper">
            <button onClick={toggleProfile} className="profile-button">
              <img
                loading="lazy"
                alt="Profile picture"
                src={user.avatar}
                className="profile-image"
              />
              <div className="profile-name">{user.name}</div>
            </button>
            {isProfileOpen && (
              <div className="profile-dropdown">
                <div className="profile-info">
                  <div className="profile-info-name">{user.name}</div>
                  <div className="profile-info-email">{user.email}</div>
                </div>
                <div className="profile-actions">
                  <button className="profile-action-button account-button">
                    <svg className="profile-action-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                    <span>Account</span>
                  </button>
                  <a
                    href="./payments"
                    className="profile-action-button account-button"
                  >
                    <svg className="profile-action-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                    <span>Payments</span>
                  </a>
                  <a
                    href="./aimodel"
                    className="profile-action-button account-button"
                  >
                    <svg className="profile-action-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                    <span>AI Model</span>
                  </a>
                  <button className="profile-action-button logout-button">
                    <svg className="profile-action-icon" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                      />
                    </svg>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
