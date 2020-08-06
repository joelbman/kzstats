import React from 'react'
import { Route, Switch } from 'react-router-dom'
import MapListView from './maps/list/MapListView'
import PlayerListView from './players/list/PlayerListView'
import BanListView from './bans/BanListView'
import HomeView from './home/HomeView'
import JumpStatsView from './jumpstats/JumpStatsView'
import { Helmet } from 'react-helmet'
import SearchView from './search/SearchView'
import PlayerDetailView from './players/detail/PlayerDetailView'
import MapDetailView from './maps/detail/MapDetailView'

const ContentWrapper = () => {
  return (
    <main
      className="flex-grow w-full text-gray-200 ml-5 mr-5 mt-20 mb-20 pr-8 lg:pl-24 lg:pr-20"
      style={{ minHeight: '85vh' }}
    >
      <Helmet defaultTitle="KZStats" titleTemplate="%s - KZStats" />
      <Switch>
        <Route exact path="/" component={HomeView} />

        <Route exact path="/maps" component={MapListView} />
        <Route path="/maps/:mapname" component={MapDetailView} />

        <Route exact path="/players" component={PlayerListView} />
        <Route path="/players/:steamid64" component={PlayerDetailView} />

        <Route exact path="/jumpstats" component={JumpStatsView} />
        <Route exact path="/bans" component={BanListView} />

        <Route path="/search/:searchStr" component={SearchView} />
      </Switch>
    </main>
  )
}

export default ContentWrapper
