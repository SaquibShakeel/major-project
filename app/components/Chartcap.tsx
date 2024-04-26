import React from 'react'

type childrenprops = {
    children: React.ReactNode
}

export default function Chartcap({children}:childrenprops) {
  return (
    <div className='w-full shadow-lg p-2 border border-black rounded-md '>
        {children}
    </div>
  )
}
