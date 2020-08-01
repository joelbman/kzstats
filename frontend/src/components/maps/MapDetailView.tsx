import React from 'react'
import { Helmet } from 'react-helmet'
import MapDetailRecords from './MapDetailRecords'
import MapDetailRecordHistory from './MapDetailRecordHistory'
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  return (
    <div>
      <Tabs className="border-2 border-black rounded-lg">
        <TabList className="bg-gray-900 h-12 list-none align-middle border-b-2 border-black table w-full">
          <Tab className="table-cell h-full pl-4 pr-4 hover:bg-teal-900 hover:font-bold align-middle border-r-2 border-black">
            Records
          </Tab>
          <Tab className="table-cell h-full pl-4 pr-4 hover:bg-teal-900 hover:font-bold align-middle">
            Statistics
          </Tab>
        </TabList>
        <TabPanel className="bg-gray-800 p-4">
          <MapDetailRecords mapname={mapname} />
        </TabPanel>
        <TabPanel className="bg-gray-800 p-4">
          <MapDetailRecordHistory mapname={mapname} />
        </TabPanel>
      </Tabs>
      <Helmet title={mapname} />
    </div>
  )
}

export default MapDetailView
