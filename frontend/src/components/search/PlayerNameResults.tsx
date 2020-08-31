import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useApiRequest from '../util/useApiRequest'

interface Props {
  searchStr: string
}

interface Player {
  name: string
  steamid64: string
  steam_id: string
  is_banned: boolean
  total_records: number
}

const PlayerNameResults = (props: Props) => {
  const [apiOptions, setApiOptions] = useState({
    name: props.searchStr,
    limit: 200,
  })
  const { error, loader, data } = useApiRequest('/players', apiOptions)

  useMemo(() => {
    setApiOptions({
      name: props.searchStr,
      limit: 200,
    })
  }, [props.searchStr])

  if (error) return error
  if (loader) return loader

  return (
    <div className="flex-grow">
      <h2>
        Players <small>({data.length})</small>
      </h2>
      {data.length > 0 ? (
        <div>
          {data.map((p: Player) => (
            <Link className="block" to={`/players/${p.steamid64}`}>
              {p.name}
            </Link>
          ))}
        </div>
      ) : (
        <p>No players found.</p>
      )}
    </div>
  )
}

export default PlayerNameResults
