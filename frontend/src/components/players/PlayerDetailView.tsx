import React from 'react'
import { Helmet } from 'react-helmet'

interface Props {
  match: { params: { steamId64: string } }
}

const PlayerDetailView = (props: Props) => {
  const steamId64 = props.match.params.steamId64
  if (!steamId64) return <div>Invalid SteamID</div>
  return (
    <div>
      <Helmet title={`Players`} />
    </div>
  )
}

export default PlayerDetailView
