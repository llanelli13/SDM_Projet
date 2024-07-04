import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file

const App = () => {
  const [difficulty, setDifficulty] = useState('beginner');
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [points, setPoints] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing'); // 'playing', 'won', 'lost'

  useEffect(() => {
    chooseWord();
  }, [difficulty]);

  const chooseWord = async () => {
    let apiUrl = 'https://random-word-api.herokuapp.com/word?number=1';

    try {
      const response = await axios.get(apiUrl);
      const randomWord = response.data[0];
      setWord(randomWord);
      setDisplayWord(Array(randomWord.length).fill('_'));
      setMistakes([]);
      setGameStatus('playing');
    } catch (error) {
      console.error('Error fetching the word: ', error);
    }
  };

  const handleGuess = (letter) => {
    if (gameStatus !== 'playing') return;

    if (word.includes(letter)) {
      const newDisplayWord = displayWord.map((char, index) =>
        word[index] === letter ? letter : char
      );
      setDisplayWord(newDisplayWord);

      if (!newDisplayWord.includes('_')) {
        setPoints(points + 1);
        setGameStatus('won');
      }
    } else {
      if (!mistakes.includes(letter)) {
        setMistakes([...mistakes, letter]);

        if (mistakes.length + 1 === 6) {
          setGameStatus('lost');
        }
      }
    }
  };

  const handleRestart = () => {
    chooseWord();
  };

  const handleChangeDifficulty = (level) => {
    setDifficulty(level);
  };

  return (
    <div className="hangman-container">
      <h1>Hangman Game</h1>
      <p>Difficulty: {difficulty}</p>
      <div className="difficulty-buttons">
        <button onClick={() => handleChangeDifficulty('beginner')}>Beginner</button>
        <button onClick={() => handleChangeDifficulty('medium')}>Medium</button>
        <button onClick={() => handleChangeDifficulty('hard')}>Hard</button>
      </div>
      <HangmanDrawing mistakes={mistakes.length} />
      <p className="word-display">Word: {displayWord.join(' ')}</p>
      <p className="mistakes">Mistakes: {mistakes.join(', ')}</p>
      <p className="points">Points: {points}</p>
      {gameStatus === 'won' && <p className="status won">Congratulations! You won!</p>}
      {gameStatus === 'lost' && <p className="status lost">Game Over! The word was: {word}</p>}
      {gameStatus !== 'playing' && <button onClick={handleRestart}>Restart</button>}
      <div className="letters">
        {'abcdefghijklmnopqrstuvwxyz'.split('').map((letter) => (
          <button key={letter} onClick={() => handleGuess(letter)} disabled={mistakes.includes(letter) || displayWord.includes(letter)}>
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
};

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

export default App;
