"use client";

import React from "react";
import { User } from "./types";

interface ProfileDropdownProps {
  user: User;
}

export const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user }) => {
  return (
    <div className="absolute right-0 top-full p-4 mt-2 w-60 rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.1)]">
      <div className="pb-3 mb-3 border-b border-solid border-b-slate-200">
        <div className="font-semibold text-blue-950">{user.name}</div>
        <div className="text-sm text-slate-500">{user.email}</div>
      </div>
      <div className="flex flex-col gap-2">
        <button className="flex gap-2 justify-center items-center p-3 w-full font-semibold rounded-lg transition-all cursor-pointer border-[none] duration-[0.2s] text-[white] bg-blue-500 hover:bg-blue-600">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="currentColor"
              d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
          </svg>
          <span>Account</span>
        </button>
        <button className="flex gap-2 justify-center items-center p-3 w-full font-semibold text-red-500 rounded-lg border border-red-500 border-solid transition-all cursor-pointer duration-[0.2s] hover:bg-red-50">
          <svg viewBox="0 0 24 24" className="w-5 h-5">
            <path
              fill="currentColor"
              d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
            />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
