import ImageC from 'components/general/ImageC'
import RecordTable from 'components/general/RecordTable'
import ChartIcon from 'components/icons/ChartIcon'
import TrophyIcon from 'components/icons/TrophyIcon'
import React, { Suspense } from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import MapRecordHistory from './MapRecordHistory'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname
  return (
    <div className="flex flex-col">
      <Helmet title={mapname} />
      <div className="flex flex-row">
        <div className="w-36 mr-4">
          <Suspense fallback={<div></div>}>
            <ImageC
              src={`/img/map/thumb/tn_${mapname}.jpg`}
              alt={mapname}
              width="140"
              height="140"
              className="border-black border-2"
            />
          </Suspense>
        </div>
        <div className="flex-grow">
          <p className="text-2xl font-bold">{mapname}</p>
          <p>Difficulty: N/A</p>
        </div>
      </div>
      <div className="flex-grow mt-8">
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
              Statistics
            </Tab>
            <div className="tab-filler"></div>
          </TabList>
          <TabPanel>
            <RecordTable mapname={mapname} />
          </TabPanel>
          <TabPanel>
            <MapRecordHistory mapname={mapname} />
          </TabPanel>
        </Tabs>
      </div>
    </div>
  )
}

export default MapDetailView
