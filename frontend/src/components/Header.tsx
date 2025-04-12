import React, { useState } from "react";
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
    <header className="sticky top-0 z-100 backdrop-blur-md border-b border-white/20 py-4 px-8">
      <div className="max-w-[1200px] mx-0 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <svg className="w-8 h-8 text-blue-500" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M13 3H6v18h4v-6h3c3.31 0 6-2.69 6-6s-2.69-6-6-6zm.2 8H10V7h3.2c1.1 0 2 .9 2 2s-.9 2-2 2z"
            />
          </svg>
          <span className="font-bold text-blue-950">SmartPark</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <button
              onClick={toggleProfile}
              className="flex items-center gap-2 p-2 rounded border-none"
            >
              <img
                src={user.avatar}
                alt="Profile picture"
                className="w-10 h-10 rounded-full object-cover aspect-square overflow-hidden"
              />
              <span className="text-blue-950 font-medium">{user.name}</span>
            </button>

            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 rounded-xl p-4 w-60 bg-white shadow-xl">
                <div className="border-b border-slate-200 pb-3 mb-3">
                  <div className="font-semibold text-blue-950">{user.name}</div>
                  <div className="text-slate-500">{user.email}</div>
                </div>
                <div className="flex flex-col gap-2">
                  <button className="w-full py-3 px-3 rounded-lg border-none bg-blue-500 text-white font-semibold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
                      />
                    </svg>
                    <span>Account</span>
                  </button>
                  <button className="w-full py-3 px-3 rounded-lg border border-red-500 text-red-500 font-semibold flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
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
