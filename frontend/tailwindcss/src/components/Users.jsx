import React from 'react'

function Users() {
  return (
    <div className="pt-4">
      <div className="text-md font-semibold pb-2">Users</div>
      <input
        placeholder="Search users..."
        className="w-full border rounded px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-gray-300"
      />
      <div className="flex items-center justify-between bg-white p-2 rounded">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-sm font-medium text-gray-800">
            M
          </div>
          <div className="text-sm">Manan bhardwaj</div>
        </div>
        <button className="bg-black text-white px-4 py-1.5 rounded hover:bg-gray-800 text-sm">
          Send Money
        </button>
      </div>
    </div>
  )
}

export default Users
