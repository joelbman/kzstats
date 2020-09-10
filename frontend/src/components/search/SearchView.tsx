import { MapIcon, PersonIcon } from 'components/icons'
import useApiRequest from 'hooks/useApiRequest'
import React, { useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import MapNameResults from './MapNameResults'
import PlayerNameResults from './PlayerNameResults'

interface Props {
  match: { params: { searchStr: string } }
}

const SearchView = (props: Props) => {
  const [apiOptions, setApiOptions] = useState({
    name: props.match.params.searchStr,
    limit: 200,
  })
  const { error, loader, data: mapData } = useApiRequest('/maps', apiOptions)
  const {
    error: playerError,
    loader: playerLoader,
    data: playerData,
  } = useApiRequest('/players', apiOptions, false, true)

  useMemo(() => {
    setApiOptions({
      name: props.match.params.searchStr,
      limit: 200,
    })
  }, [props.match.params.searchStr])

  if (loader || playerLoader) return loader || playerLoader
  if (error || playerError) return error || playerError

  return (
    <div>
      <h1>
        Search <small>"{props.match.params.searchStr}"</small>
      </h1>
      <Helmet title="Search" />
      <div className="flex-grow mt-8">
        {playerData.length + mapData.length > 0 ? (
          <Tabs selectedTabClassName="tab-selected" className="tab-main">
            <TabList>
              {playerData.length > 0 && (
                <Tab>
                  <button>
                    <PersonIcon />
                    Players ({playerData.length})
                  </button>
                </Tab>
              )}
              {mapData.length > 0 && (
                <Tab>
                  <button>
                    <MapIcon />
                    Maps ({mapData.length})
                  </button>
                </Tab>
              )}
              <div className="tab-filler"></div>
            </TabList>
            {playerData.length > 0 && (
              <TabPanel>
                <PlayerNameResults data={playerData} />
              </TabPanel>
            )}
            {mapData.length > 0 && (
              <TabPanel>
                <MapNameResults data={mapData} />
              </TabPanel>
            )}
          </Tabs>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  )
}

export default SearchView
