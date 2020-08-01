import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import MapListView from './maps/list/MapListView'
import PlayerListView from './players/list/PlayerListView'
import BanListView from './bans/BanListView'
import HomeView from './home/HomeView'
import JumpStats from './jumpstats/JumpStats'
import { Helmet } from 'react-helmet'
import SearchView from './search/SearchView'
import PlayerDetailView from './players/detail/PlayerDetailView'
import MapDetailView from './maps/detail/MapDetailView'

const ContentWrapper = () => {
  const [title, setTitle] = useState('')

  const stripTitle = (title: string) => {
    let newTitle = title.split(' - ')[0]
    return newTitle
  }

  return (
    <main
      className="flex-grow w-full text-gray-200 ml-5 mr-5 mt-20 mb-20 pr-8 lg:pl-24 lg:pr-20"
      style={{ minHeight: '85vh' }}
    >
      <Helmet
        defaultTitle="KZStats"
        titleTemplate="%s - KZStats"
        onChangeClientState={(newState: { title: string }) =>
          setTitle(newState.title)
        }
      />
      <h1 className="text-5xl font-bold text-gray-300">{stripTitle(title)}</h1>
      <Switch>
        <Route exact path="/" component={HomeView} />

        <Route exact path="/maps" component={MapListView} />
        <Route path="/maps/:mapname" component={MapDetailView} />

        <Route exact path="/players" component={PlayerListView} />
        <Route path="/players/:steamid64" component={PlayerDetailView} />

        <Route exact path="/jumpstats" component={JumpStats} />
        <Route exact path="/bans" component={BanListView} />

        <Route path="/search/:searchStr" component={SearchView} />

        <Route render={() => <h1>404</h1>} />
      </Switch>
    </main>
  )
}

export default ContentWrapper
