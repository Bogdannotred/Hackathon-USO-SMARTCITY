"use client";

import React, { useState } from "react";
import { ProfileDropdown } from "./ProfileDropdown";
import { User } from "./types";

interface HeaderProps {
  user: User;
}

export const Header: React.FC<HeaderProps> = ({ user }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <header className="sticky top-0 px-8 py-4 border-b border-solid backdrop-blur-[10px] bg-white bg-opacity-90 border-b-white border-b-opacity-20 z-[100] max-sm:px-4 max-sm:py-3">
      <div className="flex justify-between items-center mx-auto my-0 max-w-[1200px]">
        <div className="flex gap-3 items-center">
          <svg viewBox="0 0 24 24" className="w-8 h-8 text-blue-500">
            <path
              fill="currentColor"
              d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-blue-950 max-sm:text-xl">
            SmartPark
          </h2>
        </div>
        <div className="flex gap-4 items-center">
          <div className="relative">
            <button
              className="flex gap-2 items-center p-2 transition-all cursor-pointer border-[none] duration-[0.2s] rounded-[full]"
              onClick={toggleProfile}
            >
              <img
                alt="Profile picture"
                className="object-cover overflow-hidden w-10 h-10 rounded-full aspect-square"
                src={user.avatar}
              />
              <span className="font-medium text-blue-950 max-sm:hidden">
                {user.name}
              </span>
            </button>
            {isProfileOpen && <ProfileDropdown user={user} />}
          </div>
        </div>
      </div>
    </header>
  );
};
