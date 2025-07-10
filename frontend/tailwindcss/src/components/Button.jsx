import React from 'react';

function Button({ label,onClick }) {
  return (
    <div>
      <button onClick={onClick} className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition duration-200">
        {label}
      </button>
    </div>
  );
}

export default Button;
