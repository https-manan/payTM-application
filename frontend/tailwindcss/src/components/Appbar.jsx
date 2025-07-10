import React from 'react'

function Appbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 shadow-md rounded-lg bg-white m-4">
      <div className="text-lg font-medium">PayTM App</div>
      <div className="flex items-center space-x-3">
        <div className="text-sm font-medium text-gray-700">Hello</div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-800">
          U
        </div>
      </div>
    </div>
  )
}

export default Appbar
