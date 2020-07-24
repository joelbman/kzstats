import React, { useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import MapsIndex from './maps/MapsIndex'
import Players from './players/Players'
import BanList from './bans/BanList'
import Home from './home/HomeIndex'
import JumpStats from './jumpstats/JumpStats'
import { Helmet } from 'react-helmet'

const ContentWrapper = () => {
  const [title, setTitle] = useState('')

  const stripTitle = (title: string) => {
    let newTitle = title.split(' - ')[1]
    return newTitle
  }

  return (
    <main className="flex-1 h-full min-h-screen p-5 text-gray-200 ml-10">
      <Helmet
        defaultTitle="KZStats.com"
        titleTemplate="KZStats.com - %s"
        onChangeClientState={(newState: { title: string }) =>
          setTitle(newState.title)
        }
      />
      <h1 className="text-5xl font-bold text-gray-300">{stripTitle(title)}</h1>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/maps" component={MapsIndex} />
        <Route exact path="/players" component={Players} />
        <Route exact path="/jumpstats" component={JumpStats} />
        <Route exact path="/bans" component={BanList} />
        <Route render={() => <h1>404</h1>} />
      </Switch>
    </main>
  )
}

export default ContentWrapper
