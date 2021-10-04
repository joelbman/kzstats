import SearchInput from 'components/forms/SearchInput'
import Table from 'components/general/Table'
import useApiRequest from 'hooks/useApiRequest'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
  match: { params: { steamid?: string } }
}

interface ApiOpts {
  limit: number
  steam_id?: string
  steamid64?: string
}

const BanListView = (props: Props) => {
  const history = useHistory()
  const [apiOptions, setApiOptions] = useState<ApiOpts>({
    limit: 100,
    steam_id: props.match.params.steamid,
  })
  const { error, loader, data } = useApiRequest('/bans', apiOptions)

  const submitSearch = (value: string) => {
    if (value.substr(0, 5) === 'STEAM') {
      setApiOptions({ limit: 100, steam_id: value, steamid64: undefined })
    } else {
      setApiOptions({ limit: 100, steamid64: value, steam_id: undefined })
    }

    history.push('/bans/' + value)
  }

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h1>Bans</h1>
      <div>
        Below you can see 100 latest bans. You can search older bans by inserting the Steam ID below.
        <br />
        For more information/appeals, visit <a href="https://forum.gokz.org/p/player-rules">GOKZ forums</a>.
      </div>
      <div className="my-4 flex flex-row w-full lg:w-1/3 items-center">
        <SearchInput placeholder="e.g. STEAM_X:X:123456789" submit={submitSearch} label="Steam ID:" height="34px" value={props.match.params.steamid} />
      </div>
      <div>
        {data.length > 0 ? (
          <Table
            columns={[
              { key: 'player_name', header: 'Player', type: 'player' },
              { key: 'steam_id', header: 'Steam ID' },
              { key: 'ban_type', header: 'Reason', type: 'ban_type' },
              { key: 'updated_on', header: 'Date', type: 'datetime' },
              { key: 'expires_on', header: 'Expires', type: 'datetime' },
              { key: 'info', type: 'ban_info' },
            ]}
            data={data}
            sort={{ key: 'updated_on', desc: true }}
            itemsPerPage={25}
          />
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  )
}

export default BanListView
