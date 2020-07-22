import React from 'react'
import { NavLink } from 'react-router-dom'

function NavBar() {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-900 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <NavLink to="/">
          <span className="font-semibold text-xl tracking-tight">
            KZStats.com
          </span>
        </NavLink>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <NavLink
            activeClassName="font-bold"
            to="/maps"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Maps
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            to="/players"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Players
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            to="/jumpstats"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Jumpstats
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            to="/servers"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4"
          >
            Servers
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            to="/bans"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white"
          >
            Bans
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
