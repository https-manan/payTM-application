import React from 'react';

function InputBox({ label, placeholder }) {
  return (
    <div className="flex flex-col space-y-1 pt-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
      />
    </div>
  );
}

export default InputBox;
