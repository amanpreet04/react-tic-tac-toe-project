import { useState } from "react";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];
export default function GameBoard({ handleSelect, activePlayerSymbol }) {
  const [gameBoard, setGameBoard] = useState(initialBoard);

  function handleGameBoard(rowIndex, colIndex) {
    setGameBoard((previousGameBoard) => {
      const gameBoard = [...previousGameBoard.map((board) => [...board])];
      gameBoard[rowIndex][colIndex] = activePlayerSymbol;
      return gameBoard;
    });

    handleSelect();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button onClick={() => handleGameBoard(rowIndex, colIndex)}>
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
