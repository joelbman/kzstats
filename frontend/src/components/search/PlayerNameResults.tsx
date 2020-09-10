import { FlagIcon } from 'components/icons'
import React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  data: Player[]
}

interface Player {
  name: string
  steamid64: string
  steam_id: string
  is_banned: boolean
  total_records: number
  countrycode?: string
  alias?: string
}

const PlayerNameResults = (props: Props) => {
  // useEffect(() => {
  //   // Prioritize players with existing userprofiles
  //   setData(
  //     props.data.sort((a, b) => {
  //       if (a.countrycode && !b.countrycode) return -1
  //       if (b.countrycode && !a.countrycode) return 1
  //       return a.name.localeCompare(b.name)
  //     })
  //   )
  // }, [props.data])

  return (
    <div>
      <h2>
        Players <small>({props.data.length})</small>
      </h2>
      {props.data.length > 0 ? (
        <div className="grid grid-cols-4 gap-2">
          {props.data.map((p: Player) => (
            <div key={p.steamid64}>
              <Link to={`/players/${p.steamid64}`}>
                {p.alias}
                {p.countrycode && <FlagIcon code={p.countrycode} />}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No players found.</p>
      )}
    </div>
  )
}

export default PlayerNameResults
