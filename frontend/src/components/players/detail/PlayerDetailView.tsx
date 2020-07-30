import React from 'react'
import { Helmet } from 'react-helmet'
import PlayerJumpStats from './PlayerJumpStats'
import PlayerRecords from './PlayerRecords'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'

interface Props {
  match: { params: { steamid64: string } }
}

const PlayerDetailView = (props: Props) => {
  const steamid64 = props.match.params.steamid64
  if (!steamid64) return <div>Invalid SteamID</div>
  return (
    <div>
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
      <Helmet title={`Players`} />
    </div>
  )
}

export default PlayerDetailView
