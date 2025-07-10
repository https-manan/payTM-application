import React from 'react';

function Button({ label }) {
  return (
    <div>
      <button className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200">
        {label}
      </button>
    </div>
  );
}

export default Button;
