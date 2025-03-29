import React from 'react'
import { useState } from 'react'
import "./assets/css/styles.css"
import "./components/GetCat"
import GetCat from './components/GetCat'

const App = () => {

  return (
    <div className='app'>
      <h1>Discover some new Cats!</h1>
      <GetCat />
    </div>
  )

}

export default App

