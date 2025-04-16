import React from 'react';

const ConnectionLine = ({ from, to }) => {
  const x1 = from.x + 50;
  const y1 = from.y + 25;
  const x2 = to.x + 50;
  const y2 = to.y + 25;

  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke="#3a86ff"
      strokeWidth="2"
      markerEnd="url(#arrow)"
    />
  );
};

export default ConnectionLine;
