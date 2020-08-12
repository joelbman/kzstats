import ListIcon from 'components/icons/ListIcon'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NavModeSelect from './NavModeSelect'
import NavProfileBlock from './NavProfileBlock'
import NavSearchBar from './NavSearchBar'

function NavBar() {
  const [showMenu, setShowMenu] = useState(false)
  const toggleMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <nav className="flex justify-center items-center flex-wrap lg:flex-no-wrap content-start bg-gray-900 w-full border-black border-b-2 p-2 pb-4 lg:pl-12 lg:pb-1 fixed">
      <div className="hidden lg:flex items-center flex-shrink-0 text-white mr-4">
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
          <ListIcon />
        </button>
      </div>
      <div
        id="navmenu"
        className={`w-full block order-3 lg:order-2 mt-4 pb-4 lg:mt-0 lg:flex lg:pb-0 lg:items-center lg:w-auto lg:border-0 border-black border-t-2 border-b-2 ${
          !showMenu ? 'hidden' : ''
        }`}
      >
        <div className="lg:flex-grow">
          <NavLink activeClassName="font-bold" to="/maps">
            Maps
          </NavLink>
          <NavLink activeClassName="font-bold" to="/players">
            Players
          </NavLink>
          <NavLink activeClassName="font-bold" to="/jumpstats">
            Jumpstats
          </NavLink>
          <NavLink activeClassName="font-bold" to="/servers">
            Servers
          </NavLink>
          <NavLink activeClassName="font-bold" to="/bans">
            Bans
          </NavLink>
        </div>
      </div>
      <div className={`${!showMenu ? 'hidden' : ''} lg:flex order-6`}>
        <NavModeSelect />
      </div>
      <div
        className={`${
          !showMenu ? 'hidden' : ''
        } lg:flex flex-grow order-7 justify-center items-center`}
      >
        <NavProfileBlock />
      </div>
    </nav>
  )
}

export default NavBar
