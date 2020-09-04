import Table from 'components/general/Table'
import useApiRequest from 'hooks/useApiRequest'
import React from 'react'

const BanListView = () => {
  const { error, loader, data } = useApiRequest('/bans?limit=200', null)

  if (error) return error
  if (loader) return loader

  return (
    <div>
      <h1>Bans</h1>
      <div>
        Below you can see 200 latest bans. You can search older bans by
        inserting the Steam ID below.
        <br />
        For more information/appeals, visit{' '}
        <a href="https://forum.gokz.org/p/player-rules">GOKZ forums</a>.
      </div>
      <div className="my-4">
        Steam ID: <input type="text" />
      </div>
      <div>
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
      </div>
    </div>
  )
}

export default BanListView
