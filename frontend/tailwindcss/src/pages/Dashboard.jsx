import React from 'react'
import Appbar from '../components/Appbar'
import Balance from '../components/Balance'
import Users from '../components/Users'

function Dashboard() {
  return (
    <div className="min-h-screen bg-white">
      <Appbar />
      <div className="p-4 max-w-4xl mx-auto">
        <Balance value={'10,000'} />
        <Users />
      </div>
    </div>
  )
}

export default Dashboard
