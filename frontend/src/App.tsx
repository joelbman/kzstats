import React, { useState } from 'react'
import NavBar from './components/navbar/NavBar'
import ContentWrapper from './components/ContentWrapper'
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import useBodyClass from './components/util/useBodyClass'
import { ModeContext } from './context/ModeContext'
import './tailwind.output.css'

const App = () => {
  useBodyClass(['flex', 'flex-col', 'min-h-screen', 'bg-gray-700'])
  const [modeState, setModeState] = useState({
    kzMode: 'kz_timer',
    tickrate: '128',
  })
  const dispatchModeState = (mode: string, tick: string) => {
    setModeState({ kzMode: mode, tickrate: tick })
  }

  return (
    <>
      <Helmet htmlAttributes={{ lang: 'en' }} />
      <BrowserRouter>
        <ModeContext.Provider
          value={{
            modeContextState: modeState,
            modeContextDispatch: dispatchModeState,
          }}
        >
          <NavBar></NavBar>
          <ContentWrapper></ContentWrapper>
        </ModeContext.Provider>
      </BrowserRouter>
      <Footer></Footer>
    </>
  )
}

export default App
