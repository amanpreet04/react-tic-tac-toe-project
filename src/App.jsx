import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

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
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const activePlayer = deriveActivePlayer(gameTurns);
  let gameBoard = [...initialBoard.map((innerArray) => [...innerArray])];

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
      winner = players[firstSquareSelected];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

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

  function handleRematch() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, player) {
    setPlayers((previousPlayers) => {
      return { ...previousPlayers, [symbol]: player };
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
            handleSave={handlePlayerNameChange}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === "O"}
            handleSave={handlePlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} rematch={handleRematch} />
        )}
        <GameBoard handleSelect={handleSelectedSqaure} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
