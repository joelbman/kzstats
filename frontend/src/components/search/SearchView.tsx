import Axios from 'axios'
import { MapIcon, PersonIcon } from 'components/icons'
import useApiRequest from 'hooks/useApiRequest'
import React, { useEffect, useMemo, useState } from 'react'
import { Helmet } from 'react-helmet'
import { Redirect, useHistory } from 'react-router-dom'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs'
import { KZMap } from 'types'
import MapNameResults from './MapNameResults'
import PlayerNameResults from './PlayerNameResults'

interface Props {
  match: { params: { searchStr: string } }
}

const SearchView = (props: Props) => {
  const searchStr = props.match.params.searchStr
  const history = useHistory()
  const [maps, setMaps] = useState<KZMap[]>([])
  const { error: mapError, loader: mapLoader, data: mapData } = useApiRequest('/maps?is_validated=true&limit=2000', null)
  const { error: playerError, loader: playerLoader, data: playerData } = useApiRequest(`/player/search/${searchStr}`, null, true)

  useEffect(() => {
    if (searchStr.substr(0, 6) === 'STEAM_') {
      Axios.get(`https://kztimerglobal.com/api/v2.0/players?steam_id=${searchStr}`).then((res) => {
        console.log(res)
        if (res.data.length > 0) {
          history.push(`/players/${res.data[0].steamid64}`)
        }
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr])

  useMemo(() => {
    setMaps(
      mapData.filter((m: KZMap) => {
        return m.name.includes(searchStr)
      })
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData, searchStr])

  if (mapLoader || playerLoader) return mapLoader || playerLoader
  if (mapError || playerError) return mapError || playerError

  if (playerData.length === 0 && maps.length === 1) return <Redirect to={`/maps/${maps[0].name}`} />
  if (playerData.length === 1 && maps.length === 0) return <Redirect to={`/players/${playerData[0].steamid64}`} />

  return (
    <div>
      <h1>
        Search <small>"{props.match.params.searchStr}"</small>
      </h1>
      <Helmet title="Search" />
      <div className="flex-grow mt-8">
        {playerData.length + maps.length > 0 ? (
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
                    Maps ({maps.length})
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
                <MapNameResults data={maps} />
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
