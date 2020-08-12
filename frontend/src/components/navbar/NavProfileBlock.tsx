import SteamButton from 'components/general/SteamButton'
import { UserContext } from 'context/UserContext'
import React, { useContext } from 'react'
import { Img } from 'react-image'
import { Link, Redirect } from 'react-router-dom'

interface Props {}

const NavProfileBlock = () => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user

  if (!user) return <Redirect to="/" />

  return (
    <div className="flex flex-grow justify-start items-center ml-4 pl-8 pt-4 lg:pt-0 lg:border-l-2 border-black">
      <div>
        {userCtx?.user ? (
          <Link to={`players/${user?.steamid64}`}>
            <Img className="inline mr-2" src={user.avatarSmall} />
            {user.alias}
          </Link>
        ) : (
          <SteamButton content="Log in" className="p-1" />
        )}
      </div>
    </div>
  )
}

export default NavProfileBlock
