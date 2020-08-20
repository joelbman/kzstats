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

  return (
    <nav className="flex justify-center items-center flex-wrap md:flex-no-wrap content-start bg-gray-950 w-full border-black border-b-2 p-2 lg:pl-12 md:pb-1 fixed">
      <div className="hidden lg:flex items-center flex-shrink-0 text-white mr-4">
        <NavLink to="/">
          <span className="font-semibold text-2xl tracking-tight text-">
            KZStats
          </span>
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
          <NavLink activeClassName="font-bold" to="/" className="nav-latest">
            <HomeIcon />
            Latest
          </NavLink>
          <NavLink activeClassName="font-bold" to="/maps">
            <MapIcon />
            Maps
          </NavLink>
          <NavLink activeClassName="font-bold" to="/players">
            <PersonIcon />
            Players
          </NavLink>
          <NavLink activeClassName="font-bold" to="/jumpstats">
            <JumpIcon />
            Jumpstats
          </NavLink>
          <NavLink activeClassName="font-bold" to="/servers">
            <ServerIcon />
            Servers
          </NavLink>
          <NavLink activeClassName="font-bold" to="/bans">
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
