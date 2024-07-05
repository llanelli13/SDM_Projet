import React from 'react';

const LetterButtons = ({ handleGuess, displayWord, mistakes }) => {
  return (
    <div className="letters">
      {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
        <button
          key={letter}
          onClick={() => handleGuess(letter)}
          disabled={mistakes.includes(letter) || displayWord.includes(letter)}
        >
          {letter}
        </button>
      ))}
    </div>
  );
};

export default LetterButtons;