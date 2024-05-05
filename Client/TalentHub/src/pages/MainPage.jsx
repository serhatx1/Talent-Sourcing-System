import React, { useEffect } from 'react'
import { useState } from 'react';
import { LeftBar } from '../components/LeftBar';
import { Candidates } from '../components/Candidates';
import { Dashboard } from '../components/Dashboard';
import { MenuSection } from '../components/MenuSection';
import { CreateUser } from '../components/CreateUser';
export const MainPage = () => {
  const [showDashboard, setShowDashboard] = useState(true);
  const handleDashboardClick = (prop) => {
    setShowDashboard(prop);
  };
  const returnDash = ()=>{
    if(showDashboard==true){
      return <Dashboard/>
    }
    else{
      return <CreateUser setShowDashboard={setShowDashboard} showDashboard={showDashboard} returnDash={returnDash}/>
    }

  }
  useEffect(()=>{
  
    returnDash()
  },[showDashboard])
  console.log(showDashboard)

  return (
    <div className='h-full flex w-full mainPage'>
    <LeftBar showDashboard={showDashboard} dash={handleDashboardClick}/>
    {returnDash()}
  </div>
  )
}
