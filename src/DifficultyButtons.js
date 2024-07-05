import React from 'react';

const DifficultyButtons = ({ handleChangeDifficulty }) => {
  return (
    <div className="difficulty-buttons">
      <button onClick={() => handleChangeDifficulty('beginner')}>Beginner</button>
      <button onClick={() => handleChangeDifficulty('medium')}>Medium</button>
      <button onClick={() => handleChangeDifficulty('hard')}>Hard</button>
    </div>
  );
};

export default DifficultyButtons;