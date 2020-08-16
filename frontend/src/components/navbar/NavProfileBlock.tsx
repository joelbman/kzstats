import SteamButton from 'components/general/SteamButton'
import { UserContext } from 'context/UserContext'
import React, { useContext } from 'react'
import { Img } from 'react-image'
import { Link } from 'react-router-dom'

interface Props {
  hidden: boolean
}

const NavProfileBlock = (props: Props) => {
  const userCtx = useContext(UserContext)
  const user = userCtx?.user
  const hidden = props.hidden ? 'hidden' : ''
  const classes = `${hidden} lg:flex order-7 items-centerflex flex-grow justify-start items-center pt-2 lg:ml-4 lg:pl-8 lg:pt-0 lg:border-l-2 border-black`

  return (
    <div className={classes}>
      <div>
        {user ? (
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
