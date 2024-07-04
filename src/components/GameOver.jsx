export default function GameOver({ winner }) {
  return (
    <div id="game-over">
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw!</p>}
      <p>
        <button>Rematch!</button>
      </p>
    </div>
  );
}
