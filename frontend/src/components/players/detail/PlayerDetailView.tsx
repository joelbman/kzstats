import React, { useState, useMemo } from 'react'
import { Helmet } from 'react-helmet'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import PlayerJumpStats from './PlayerJumpStats'
import PlayerRecords from './PlayerRecords'
import useApiRequest from '../../util/useApiRequest'

interface Player {
  steamid64: string
  steam_id: string
  is_banned: boolean
  total_records: number
  name: string
}

interface Props {
  match: { params: { steamid64: string } }
}

const PlayerDetailView = (props: Props) => {
  const steamid64 = props.match.params.steamid64
  const [apiOptions] = useState({ steamid64_list: steamid64 })
  const { error, isLoaded, data } = useApiRequest('/players', apiOptions)
  const [player, setPlayer] = useState<Player | null>(null)

  useMemo(() => {
    setPlayer(data[0])
  }, [data])

  if (error) return <div>Error: {error.message}</div>
  if (!isLoaded) return <div className="loader"></div>

  return (
    <div className="flex">
      {player && <Helmet title={player.name} />}
      <Tabs className="border-2 border-black rounded-lg">
        <TabList className="bg-gray-900 h-12 list-none align-middle border-b-2 border-black table w-full">
          <Tab className="table-cell h-full pl-4 pr-4 hover:bg-teal-900 hover:font-bold align-middle border-r-2 border-black">
            Records
          </Tab>
          <Tab className="table-cell h-full pl-4 pr-4 hover:bg-teal-900 hover:font-bold align-middle border-r-2 border-black">
            Jumpstats
          </Tab>
          <Tab className="table-cell h-full pl-4 pr-4 hover:bg-teal-900 hover:font-bold align-middle">
            Statistics
          </Tab>
        </TabList>

        <TabPanel className="bg-gray-800 h-64 p-4">
          <PlayerRecords steamid64={steamid64} />
        </TabPanel>
        <TabPanel className="bg-gray-800 h-64 p-4">
          <PlayerJumpStats steamid64={steamid64} />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default PlayerDetailView
