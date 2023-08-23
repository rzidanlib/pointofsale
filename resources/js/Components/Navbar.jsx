import { Link } from "@inertiajs/react";
import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-cyan-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="bg-white rounded-md p-1">
          <img
            src="https://alan.co.id/wp-content/uploads/2022/09/Logo-Alan-Creative-1536x360-1.png"
            className="h-8 "
            alt="Flowbite Logo"
          />
        </div>
        <div className="w-auto" id="navbar-default">
          <ul className="font-medium flex p-0 flex-row space-x-8 mt-0 text-lg">
            <li>
              <Link
                href={route("home")}
                className="text-white p-0 hover:text-slate-200"
                aria-current="page"
              >
                Homepage
              </Link>
            </li>
            <li>
              <Link
                href={route("products")}
                className="text-white p-0 hover:text-slate-200"
              >
                Products
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
