import React from 'react';

function Heading({ label }) {
  return (
    <div className="text-3xl font-bold text-center pb-2">
      {label}
    </div>
  );
}

export default Heading;
