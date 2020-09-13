import {
  BanIcon,
  HomeIcon,
  JumpIcon,
  ListIcon,
  MapIcon,
  PersonIcon,
  ServerIcon,
} from 'components/icons'
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
  const closeMenu = () => {
    setShowMenu(false)
  }

  return (
    <nav className="nav-main">
      <div className="hidden xl:flex items-center flex-shrink-0 text-white mr-4">
        <NavLink to="/">
          <span className="font-semibold text-2xl tracking-tight">KZStats</span>
        </NavLink>
      </div>
      <NavSearchBar />
      <div className="order-2 md:hidden ml-4">
        <button
          onClick={toggleMenu}
          className="text-gray-500 border-gray-750 border-2 p-2 rounded"
        >
          <ListIcon />
        </button>
      </div>
      <div id="navmenu" className={!showMenu ? 'hidden md:flex' : 'block'}>
        <div className="md:flex-grow md:pl-2">
          <NavLink
            activeClassName="font-bold"
            to="/"
            onClick={closeMenu}
            className="nav-latest"
          >
            <HomeIcon />
            Latest
          </NavLink>
          <NavLink activeClassName="font-bold" onClick={closeMenu} to="/maps">
            <MapIcon />
            Maps
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            onClick={closeMenu}
            to="/players"
          >
            <PersonIcon />
            Players
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            onClick={closeMenu}
            to="/jumpstats"
          >
            <JumpIcon />
            Jumpstats
          </NavLink>
          <NavLink
            activeClassName="font-bold"
            onClick={closeMenu}
            to="/servers"
          >
            <ServerIcon />
            Servers
          </NavLink>
          <NavLink activeClassName="font-bold" onClick={closeMenu} to="/bans">
            <BanIcon />
            Bans
          </NavLink>
        </div>
      </div>
      <div
        className={`${
          !showMenu ? 'hidden' : 'flex'
        } md:flex align-middle md:w-auto w-full justify-center content-center items-center order-4 mt-2 pt-2 md:p-0 md:m-0`}
      >
        <NavModeSelect />
        <NavProfileBlock />
      </div>
    </nav>
  )
}

export default NavBar
