import React from 'react'

function Balance({ value }) {
  return (
    <div className="text-lg font-semibold pb-4">
      Your balance <span className="font-bold">Rs {value}</span>
    </div>
  )
}

export default Balance
