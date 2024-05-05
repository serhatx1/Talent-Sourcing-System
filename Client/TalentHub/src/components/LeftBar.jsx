import React from 'react'
import { Logo } from './Logo'
import { MenuSection } from './MenuSection'

export const LeftBar = ({dash}) => {
  return (
    <div className="leftNav h-full w-1/5 flex-col border-2 border-slate-600 bg-slate-100 flex ">
      <div className='flex flex-col'>
      <Logo/>
      <MenuSection dash={dash}/>
      </div>
   

    </div>
  )
}
