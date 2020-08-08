import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Img } from 'react-image'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import useApiRequest from '../../util/useApiRequest'
import PlayerJumpStats from './PlayerJumpStats'
import PlayerRecords from './PlayerRecords'

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
  if (!player) return <h1>Error</h1>

  return (
    <div className="flex flex-col">
      <Helmet title={player.name} />
      <div className="flex flex-row">
        <div className="w-56">
          <Img
            src="/img/noimage.png"
            alt="img"
            width="200"
            height="200"
            className="border-black border-2"
          />
        </div>
        <div className="flex-grow">
          <p className="text-2xl font-bold">{player.name}</p>
          <p>Country: N/A</p>
          <p>{player.steam_id}</p>
          <p>
            <a href="#asd">Steam profile</a>
          </p>
        </div>
      </div>
      <div className="flex-grow mt-8">
        <Tabs className="border-2 border-black w-full">
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

          <TabPanel className="bg-gray-800 p-4">
            <PlayerRecords steamid64={steamid64} />
          </TabPanel>
          <TabPanel className="bg-gray-800 p-4">
            <PlayerJumpStats steamid64={steamid64} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default PlayerDetailView
