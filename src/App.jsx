import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Logs from "./components/Logs";
import { WINNING_COMBINATIONS } from "./winning-combinations";

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
        <GameBoard handleSelect={handleSelectedSqaure} turns={gameTurns} />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
