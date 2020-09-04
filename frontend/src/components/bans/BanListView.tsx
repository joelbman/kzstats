import Table from 'components/general/Table'
import { SearchIcon } from 'components/icons'
import useApiRequest from 'hooks/useApiRequest'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'

interface Props {
  match: { params: { steamid?: string } }
}

const BanListView = (props: Props) => {
  const history = useHistory()
  const [apiOptions, setApiOptions] = useState({
    limit: 100,
    steam_id: props.match.params.steamid,
  })
  const [search, setSearch] = useState('')
  const { error, loader, data } = useApiRequest('/bans', apiOptions)

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      e.preventDefault()
      e.stopPropagation()
      submitSearch()
    }
  }

  const submitSearch = () => {
    setApiOptions({ limit: 100, steam_id: search })
    history.push('/bans/' + search)
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h1>Bans</h1>
      <div>
        Below you can see 100 latest bans. You can search older bans by
        inserting the Steam ID below.
        <br />
        For more information/appeals, visit{' '}
        <a href="https://forum.gokz.org/p/player-rules">GOKZ forums</a>.
      </div>
      <div className="my-4">
        <form className="flex flex-row w-full lg:w-1/3 items-center">
          Steam ID:{' '}
          <input
            placeholder="e.g. STEAM_X:X:1111111111"
            className="flex-grow border border-black rounded-l-lg py-1"
            style={{ height: '34px' }}
            onKeyDown={onKeyDown}
            onChange={handleInput}
            maxLength={40}
            type="text"
          />
          <button
            className="bg-green-700 text-gray-200 border-black border rounded-r-lg w-7 p-1 px-2"
            style={{ height: '34px' }}
            onClick={submitSearch}
          >
            <SearchIcon className="mr-0 w-5 h-5" />
          </button>
        </form>
      </div>
      <div>
        {data.length > 0 ? (
          <Table
            columns={[
              { key: 'player_name', header: 'Player', type: 'player' },
              { key: 'steam_id', header: 'Steam ID' },
              { key: 'notes', header: 'Reason' },
              { key: 'updated_on', header: 'Date', type: 'datetime' },
              { key: 'expires_on', header: 'Expires', type: 'datetime' },
            ]}
            data={data}
            sort={{ key: 'updated_on', desc: true }}
            itemsPerPage={40}
          />
        ) : (
          <p>No data available.</p>
        )}
      </div>
    </div>
  )
}

export default BanListView
