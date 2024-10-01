"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",
  },
  {
    title: "Add Hotel",
    href: "/admin/add-hotel",
    icon: "M12 6v6m0 0v6m0-6h6m-6 0H6",
  },
  {
    title: "Track Orders",
    href: "/admin/track-orders",
    icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01",
  },
  {
    title: "Hotels",
    href: "/admin/hotels",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    title: "Offers",
    href: "/admin/offers",
    icon: "M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z",
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-center h-20 shadow-md">
          <h1 className="text-3xl font-bold text-primary">Admin Panel</h1>
        </div>
        <nav className="mt-10">
          {menuItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center mt-4 py-2 px-6 hover:bg-gray-200"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={item.icon}
                />
              </svg>
              <span className="mx-3">{item.title}</span>
            </Link>
          ))}
        </nav>
      </div>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed z-50 bottom-4 right-4 bg-primary text-white p-2 rounded-full focus:outline-none lg:hidden"
      >
        <svg
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </>
  );
}
