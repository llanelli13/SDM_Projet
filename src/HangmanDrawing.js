import React from 'react';

const HangmanDrawing = ({ mistakes }) => {
  const bodyParts = [
    <circle key="head" cx="140" cy="70" r="20" fill="none" stroke="black" strokeWidth="2" />,
    <line key="body" x1="140" y1="90" x2="140" y2="150" stroke="black" strokeWidth="2" />,
    <line key="left-arm" x1="140" y1="120" x2="110" y2="100" stroke="black" strokeWidth="2" />,
    <line key="right-arm" x1="140" y1="120" x2="170" y2="100" stroke="black" strokeWidth="2" />,
    <line key="left-leg" x1="140" y1="150" x2="110" y2="180" stroke="black" strokeWidth="2" />,
    <line key="right-leg" x1="140" y1="150" x2="170" y2="180" stroke="black" strokeWidth="2" />
  ];

  return (
    <svg height="250" width="200" className="hangman-drawing">
      <line x1="60" y1="20" x2="140" y2="20" stroke="black" strokeWidth="2" />
      <line x1="140" y1="20" x2="140" y2="50" stroke="black" strokeWidth="2" />
      <line x1="60" y1="20" x2="60" y2="230" stroke="black" strokeWidth="2" />
      <line x1="20" y1="230" x2="100" y2="230" stroke="black" strokeWidth="2" />
      {bodyParts.slice(0, mistakes)}
    </svg>
  );
};

export default HangmanDrawing;