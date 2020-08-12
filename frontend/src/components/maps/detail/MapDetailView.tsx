import ChartIcon from 'components/icons/ChartIcon'
import TrophyIcon from 'components/icons/TrophyIcon'
import React from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import MapRecordHistory from './MapRecordHistory'
import MapRecords from './MapRecords'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  return (
    <div>
      <Helmet title={mapname} />
      <h1>{mapname}</h1>
      <Tabs
        selectedTabClassName="font-bold text-white border-b-2 border-black bg-blue-900"
        className="tab-main"
      >
        <TabList>
          <Tab>
            <TrophyIcon />
            Records
          </Tab>
          <Tab>
            <ChartIcon />
            WR History
          </Tab>
          <Tab disabled={true} className="tab-filler"></Tab>
        </TabList>
        <TabPanel>
          <MapRecords mapname={mapname} />
        </TabPanel>
        <TabPanel>
          <MapRecordHistory mapname={mapname} />
        </TabPanel>
      </Tabs>
    </div>
  )
}

export default MapDetailView
