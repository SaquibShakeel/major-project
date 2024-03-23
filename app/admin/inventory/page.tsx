import Foods from '../../components/Foods'
import CreateFood from '../../components/CreateFood'
import React from 'react'

const page = () => {
  return (
    <div>
      <CreateFood/>
      <Foods />
    </div>
  )
}

export default page