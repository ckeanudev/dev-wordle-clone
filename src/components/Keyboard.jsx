import React, { useCallback, useEffect, useContext } from "react";

import { AppContext } from "../App";

import Keys from "./Keys";

const Keyboard = () => {
  const {
    board,
    setBoard,
    currentAttempt,
    setCurrentAttempt,
    onSelectLetter,
    onDeleteLetter,
    onEnterLetter,
    setDisabledLetters,
    disabledLetters,
  } = useContext(AppContext);
  const line1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const line2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const line3 = ["Z", "X", "C", "V", "B", "N", "M"];

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnterLetter(event.key);
    } else if (event.key === "Backspace") {
      onDeleteLetter(event.key);
    } else {
      line1.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      line2.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
      line3.forEach((key) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          onSelectLetter(key);
        }
      });
    }
  });

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard);

    return () => {
      document.removeEventListener("keydown", handleKeyboard);
    };
  }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {line1.map((keyletter, i) => {
          return (
            <Keys
              keyletter={keyletter}
              i={i}
              key={i}
              disabled={disabledLetters.includes(keyletter)}
            />
          );
        })}
      </div>
      <div className="line2">
        {line2.map((keyletter, i) => {
          return (
            <Keys
              keyletter={keyletter}
              i={i}
              key={i}
              disabled={disabledLetters.includes(keyletter)}
            />
          );
        })}
      </div>
      <div className="line3">
        <Keys keyletter={"Enter"} i={0} />
        {line3.map((keyletter, i) => {
          return (
            <Keys
              keyletter={keyletter}
              i={i}
              key={i}
              disabled={disabledLetters.includes(keyletter)}
            />
          );
        })}
        <Keys keyletter={"Delete"} i={0} />
      </div>
    </div>
  );
};

export default Keyboard;
