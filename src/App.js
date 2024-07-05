// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HangmanDrawing from './HangmanDrawing';
import DifficultyButtons from './DifficultyButtons';
import LetterButtons from './LetterButtons';
import './App.css';

const App = () => {
  const [difficulty, setDifficulty] = useState('beginner');
  const [word, setWord] = useState('');
  const [displayWord, setDisplayWord] = useState([]);
  const [mistakes, setMistakes] = useState([]);
  const [points, setPoints] = useState(0);
  const [gameStatus, setGameStatus] = useState('playing');

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
      <DifficultyButtons handleChangeDifficulty={handleChangeDifficulty} />
      <HangmanDrawing mistakes={mistakes.length} />
      <p className="word-display">Word: {displayWord.join(' ')}</p>
      <p className="mistakes">Mistakes: {mistakes.join(', ')}</p>
      <p className="points">Points: {points}</p>
      {gameStatus === 'won' && <p className="status won">Congratulations! You won!</p>}
      {gameStatus === 'lost' && <p className="status lost">Game Over! The word was: {word}</p>}
      {gameStatus !== 'playing' && <button onClick={handleRestart}>Restart</button>}
      <LetterButtons handleGuess={handleGuess} displayWord={displayWord} mistakes={mistakes} />
    </div>
  );
};

export default App;