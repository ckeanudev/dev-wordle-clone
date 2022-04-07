import React, { createContext, useState, useEffect } from "react";

import "./App.css";

import Board from "./components/Board";
import GameOver from "./components/GameOver";
import Keyboard from "./components/Keyboard";
import { boardDefault, generateWordSet } from "./Word";

export const AppContext = createContext();

function App() {
  const [reset, setReset] = useState(false);

  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });

  const [wordSet, setWordSet] = useState(new Set());

  const [correctWord, setCorrectWord] = useState("");

  const [disabledLetters, setDisabledLetters] = useState([]);
  const [gameOver, setGameOver] = useState({
    gameOver: false,
    guessedWord: false,
  });

  useEffect(() => {
    generateWordSet().then((words) => {
      setWordSet(words.wordSet);
      setCorrectWord(words.todayWord);
    });
  }, [reset]);

  const onSelectLetter = (keyletter) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyletter;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };

  const onDeleteLetter = (keyletter) => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };

  const onEnterLetter = (keyletter) => {
    if (currentAttempt.letterPos !== 5) return;

    let currWord = "";

    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }

    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPos: 0,
      });
    } else {
      alert("Word Not Found");
    }

    if (currWord.toLowerCase() === correctWord.toLowerCase()) {
      setGameOver({
        gameOver: true,
        guessedWord: true,
      });
      return;
    }

    if (currentAttempt.attempt === 5) {
      setGameOver({ gameOver: true, guessedWord: false });
    }
  };

  return (
    <div className="App">
      <AppContext.Provider
        value={{
          board,
          setBoard,
          currentAttempt,
          setCurrentAttempt,
          onSelectLetter,
          onDeleteLetter,
          onEnterLetter,
          correctWord,
          setDisabledLetters,
          disabledLetters,
          gameOver,
          setGameOver,
          reset,
          setReset,
        }}
      >
        <nav>
          <h1>Wordle Clone</h1>
        </nav>

        <Board />
        {gameOver.gameOver ? <GameOver /> : <Keyboard />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
