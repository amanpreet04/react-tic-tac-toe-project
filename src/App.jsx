import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentlyActivePlayer = "X";
  if (gameTurns.length && gameTurns[0].player === "X") {
    currentlyActivePlayer = "O";
  }
  return currentlyActivePlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = initialBoard;

  for (const turn of gameTurns) {
    const { state, player } = turn;
    const { row, col } = state;

    gameBoard[row][col] = player;
  }

  let winner;
  for (const combinations of WINNING_COMBINATIONS) {
    const firstSquareSelected =
      gameBoard[combinations[0].row][combinations[0].column];
    const secondSquareSelected =
      gameBoard[combinations[1].row][combinations[1].column];
    const thirdSquareSelected =
      gameBoard[combinations[2].row][combinations[2].column];

    if (
      firstSquareSelected &&
      firstSquareSelected === secondSquareSelected &&
      firstSquareSelected === thirdSquareSelected
    ) {
      winner = firstSquareSelected;
    }
  }

  function handleSelectedSqaure(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentlyActivePlayer = deriveActivePlayer(prevTurns);

      const updatedTurns = [
        {
          state: { row: rowIndex, col: colIndex },
          player: currentlyActivePlayer,
        },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === "X"}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
          />
        </ol>
        {winner && <p>You won, {winner}</p>}
        <GameBoard handleSelect={handleSelectedSqaure} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
