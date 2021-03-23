import React from 'react';

export const LeftCircle = () => {
  const style: React.CSSProperties = {
    position: 'absolute',
    display: 'inline-block',
    top: '50%',
    left: '100%',
    transform: 'translate(-25%, -50%)',
    width: '80vh',
    height: '80vh',
    borderRadius: '50%',
    backgroundColor: 'rgba(84, 60, 82, 1)',
  };

  return <div style={style}></div>;
};
