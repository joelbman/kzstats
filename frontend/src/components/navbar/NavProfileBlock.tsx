import SteamButton from 'components/general/SteamButton'
import { UserContext } from 'context/UserContext'
import React, { useContext } from 'react'
import { Img } from 'react-image'
import { Link } from 'react-router-dom'

const NavProfileBlock = () => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user

  return (
    <div className="order-7 items-center flex justify-center align-middle md:ml-4 md:pl-4 md:pt-0 md:border-l-2 border-gray-850 md:flex md:flex-shrink-0 ">
      <div>
        {user ? (
          <Link to={`/players/${user?.steamid64}`}>
            <Img className="inline mr-2" src={user.avatarSmall} />
            {user.alias}
          </Link>
        ) : (
          <SteamButton className="p-1" />
        )}
      </div>
    </div>
  )
}

export default NavProfileBlock
