import React from 'react'

function SendMoney() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Send Money</h2>

        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold text-lg">
            A
          </div>
          <div className="ml-3 font-semibold text-lg">Manan Bhardwaj</div>
        </div>

        <div className="mb-2 text-sm font-medium text-gray-700">
          Amount (in Rs)
        </div>
        <input
          type="text"
          placeholder="Enter amount"
          className="w-full border rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
        />

        <button className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 font-medium transition duration-200">
          Initiate Transfer
        </button>
      </div>
    </div>
  )
}

export default SendMoney
