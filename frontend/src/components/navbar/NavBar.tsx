import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavModeSelect from './NavModeSelect'
import NavSearchBar from './NavSearchBar'

function NavBar() {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className="flex items-center flex-wrap lg:flex-no-wrap justify-center content-start bg-gray-900 w-full border-black border-b-2 p-2 pb-1 lg:pl-32 fixed">
      <div className="hidden lg:flex items-center flex-shrink-0 text-white mr-6">
        <NavLink to="/">
          <span className="font-semibold text-2xl tracking-tight">KZStats</span>
        </NavLink>
      </div>
      <NavSearchBar />
      <div className="order-2 lg:hidden ml-4">
        <button
          onClick={toggleMenu}
          className="text-white border-gray-300 border-2 p-4 rounded-lg"
        >
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
      <div
        id="navmenu"
        className={`w-full block order-3 lg:order-2 mt-4 lg:mt-0 lg:flex lg:items-center lg:w-auto lg:border-0 border-black border-t-2 ${
          !showMenu ? 'hidden' : ''
        }`}
      >
        <div className="lg:flex-grow">
          <NavLink
            activeClassName="font-bold"
            to="/maps"
            className="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white hover:underline mr-4"
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
      <div className={`${!showMenu ? 'hidden' : ''} lg:flex flex-grow order-6`}>
        <NavModeSelect />
      </div>
    </nav>
  )
}

export default NavBar
