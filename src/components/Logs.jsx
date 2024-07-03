export default function Logs({ turns }) {
  return (
    <ol id="log">
      {turns.map((turn) => {
        <li key={`${turn.state.row}${turn.state.col}`}>
          {turn.player} selected {turn.state.row},{turn.state.col}
        </li>;
      })}
    </ol>
  );
}
