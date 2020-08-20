import ImageC from 'components/general/ImageC'
import RecordTable from 'components/general/RecordTable'
import ChartIcon from 'components/icons/ChartIcon'
import TrophyIcon from 'components/icons/TrophyIcon'
import { difficultyToText } from 'components/util/filters'
import useApiRequest from 'components/util/useApiRequest'
import React, { Suspense, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import MapRecordHistory from './MapRecordHistory'

interface Props {
  match: { params: { mapname: string } }
}

const MapDetailView = (props: Props) => {
  const mapname = props.match.params.mapname

  const [apiOptions] = useState({ name: mapname })
  const { error, isLoaded, data } = useApiRequest('/maps/', apiOptions)

  if (!isLoaded || !data) return <div className="loader"></div>
  if (error?.message) return <div>Error: {error.message}</div>

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
          <p>Difficulty: {difficultyToText(data[0]?.difficulty)}</p>
        </div>
      </div>
      <div className="flex-grow mt-8">
        <Tabs selectedTabClassName="tab-selected" className="tab-main">
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
