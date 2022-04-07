import React, { useContext } from "react";
import { AppContext } from "../App";

import { boardDefault } from "../Word";

const GameOver = () => {
  const {
    board,
    setBoard,
    gameOver,
    setGameOver,
    correctWord,
    currentAttempt,
    setCurrentAttempt,
    reset,
    setReset,
    setDisabledLetters,
    disabledLetters,
  } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h1>
        {gameOver.guessedWord
          ? "🎊🎉You Correctly Guessed!🎉🎊"
          : "☹️You Failed☹️"}
      </h1>
      <h2>The Correct Word is "{correctWord.toUpperCase()}"</h2>
      {gameOver.guessedWord && (
        <h3>
          You guessed in {currentAttempt.attempt}{" "}
          {currentAttempt.attempt > 1 ? "attempts" : "attempt"}
        </h3>
      )}

      <button
        onClick={() => {
          if (reset) {
            setReset(false);
          } else {
            setReset(true);
          }

          setBoard([
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
            ["", "", "", "", ""],
          ]);

          setCurrentAttempt({
            attempt: 0,
            letterPos: 0,
          });

          setGameOver({
            gameOver: false,
            guessedWord: false,
          });

          setDisabledLetters([]);
        }}
      >
        Restart
      </button>
    </div>
  );
};

export default GameOver;
