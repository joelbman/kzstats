import ErrorHandler from 'components/general/ErrorHandler'
import { ChartIcon } from 'components/icons'
import TrophyIcon from 'components/icons/TrophyIcon'
import useApiRequest from 'hooks/useApiRequest'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'

interface Props {
  match: { params: { id: string; selectedTab?: string } }
}

const ServerDetailView = (props: Props) => {
  let url, apiOpt
  const params = props.match.params

  // Handle requests by IP:Port, default to ID
  if (params.id.split(':').length > 1) {
    url = 'servers'
    const split = params.id.split(':')
    apiOpt = { ip: split[0], port: split[1] }
  } else {
    url = `servers/${params.id}`
    apiOpt = null
  }

  const [apiOptions] = useState(apiOpt)
  const { error, loader, data } = useApiRequest(url, apiOptions)
  const [activeTab, setActiveTab] = useState(0)

  if (error) return error
  if (loader) return loader

  const server = data?.name ? data : data[0]
  if (!server) return <ErrorHandler type={404} />

  return (
    <div>
      <h1>{server.name}</h1>
      <Helmet title={server.name} />
      <Tabs
        selectedIndex={activeTab}
        selectedTabClassName="tab-selected"
        className="tab-main"
        onSelect={(i: number) => {
          setActiveTab(i)
        }}
      >
        <TabList>
          <Tab>
            <button>
              <TrophyIcon />
              Records
            </button>
          </Tab>
          <Tab>
            <button>
              <ChartIcon />
              Statistics
            </button>
          </Tab>
          <div className="tab-filler"></div>
        </TabList>
        <TabPanel></TabPanel>
        <TabPanel></TabPanel>
      </Tabs>
    </div>
  )
}

export default ServerDetailView
