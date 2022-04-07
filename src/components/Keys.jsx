import React, { useContext } from "react";

import { AppContext } from "../App";

import { boardDefault } from "../Word";

const Keys = ({ keyletter, i, disabled }) => {
  const {
    board,
    setBoard,
    currentAttempt,
    setCurrentAttempt,
    onSelectLetter,
    onDeleteLetter,
    onEnterLetter,
  } = useContext(AppContext);

  return (
    <div
      className="key"
      key={i}
      id={disabled ? "disabled" : ""}
      onClick={() => {
        if (keyletter === "Enter") {
          onEnterLetter(keyletter);
        } else if (keyletter === "Delete") {
          onDeleteLetter(keyletter);
        } else {
          onSelectLetter(keyletter);
        }
      }}
    >
      {keyletter === "Delete" ? (
        <i className="fa-solid fa-delete-left"></i>
      ) : (
        keyletter
      )}
    </div>
  );
};

export default Keys;
