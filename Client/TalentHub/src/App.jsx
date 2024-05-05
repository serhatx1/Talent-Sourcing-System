import { useState } from 'react'
import './App.css'

import { MainPage } from './pages/MainPage'
import { getAllCandidates } from './api/candidates'

function App() {

  return (
    <div className='h-full w-full'>
     <MainPage/>
    </div>
  )
}

export default App
