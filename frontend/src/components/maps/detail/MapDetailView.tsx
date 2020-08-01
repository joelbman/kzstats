import React from 'react'
import { Helmet } from 'react-helmet'
import MapRecords from './MapRecords'
import MapRecordHistory from './MapRecordHistory'
import { TabList, Tabs, Tab, TabPanel } from 'react-tabs'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  return (
    <div>
      <Tabs
        selectedTabClassName="font-bold text-white border-b-2 border-black bg-blue-900"
        className="border-2 border-black"
      >
        <TabList className="bg-gray-900 h-12 list-none align-middle border-b-2 border-black table table-fixed w-full">
          <Tab className="table-cell h-full pl-4 pr-4 w-1/6 hover:bg-blue-800 hover:cursor-pointer hover:font-bold align-middle border-r-2 border-black">
            Records
          </Tab>
          <Tab className="table-cell h-full pl-4 pr-4 w-1/6 hover:bg-blue-800 hover:cursor-pointer hover:font-bold align-middle  border-r-2 border-black">
            WR history
          </Tab>
          <Tab disabled={true} className="table-cell h-full pl-4 pr-4"></Tab>
        </TabList>
        <TabPanel className="bg-gray-800 p-4">
          <MapRecords mapname={mapname} />
        </TabPanel>
        <TabPanel className="bg-gray-800 p-4">
          <MapRecordHistory mapname={mapname} />
        </TabPanel>
      </Tabs>
      <Helmet title={mapname} />
    </div>
  )
}

export default MapDetailView
