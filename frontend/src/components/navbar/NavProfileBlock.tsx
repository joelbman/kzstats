import Axios from 'axios'
import SteamButton from 'components/general/SteamButton'
import { UserContext } from 'context/UserContext'
import React, { useContext, useState } from 'react'
import { Img } from 'react-image'
import { Link, useHistory } from 'react-router-dom'

const NavProfileBlock = () => {
  const [showMenu, setShowMenu] = useState(false)
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const history = useHistory()

  const logOut = () => {
    Axios.get('/api/auth/logout')
      .then(() => {
        userCtx?.dispatch(null)
        history.push('/')
      })
      .catch(() => {
        userCtx?.dispatch(null)
        history.push('/')
      })
  }

  return (
    <div className="order-7 items-center flex justify-center ml-4 md:pl-4 md:pt-0 md:border-l-2 border-gray-850 md:flex">
      {user ? (
        <div>
          <div>
            <Link to={`/players/${user?.steamid64}`}>
              <Img className="inline mr-2" src={user.avatarSmall} />
              <span className="profile-alias">{user.alias}</span>
            </Link>
            <span className="text-xs inline ml-1 cursor-pointer" onClick={() => setShowMenu(!showMenu)}>
              {String.fromCharCode(9660)}
            </span>
          </div>
          {showMenu && (
            <div className="profile-dropdown">
              <Link to={`/players/${user?.steamid64}/settings`}>
                <button>Settings</button>
              </Link>
              <button onClick={logOut}>Logout</button>
            </div>
          )}
        </div>
      ) : (
        <SteamButton className="p-1" />
      )}
    </div>
  )
}

export default NavProfileBlock
