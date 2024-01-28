import { useState } from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {
  const [history, setHistory] = useState([
    { squares: Array(9).fill(null) }
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const calculatorWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a]
        && squares[a] === squares[b]
        && squares[a] === squares[c]
      ) {
        return squares[a]
      }
    }
    return null;
  }
  const current = history[stepNumber]
  const winner = calculatorWinner(current.squares);

  const status = {
    'X': `Winnrer: ${ winner }`,
    'O': `Winnrer: ${ winner }`,
    'null': `Next Player : ${ xIsNext ? 'X' : 'O' }`
  }

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();

    if (calculatorWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory([...newHistory, { squares: newSquares }])
    setXIsNext(current => !current)

    setStepNumber(newHistory.length);
  }

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext((step % 2) === 0);
  }

  return (
    <div className='game'>
      <div className='game-board'>
        <Board winner={winner} status={status} squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className='game-info'>
        <div className='status'>{status[winner]}</div>
        <div className='historySection'>
          {
            history.map((data, move) => {
              const buttonSet = !move ? `Go to game start` : `Go to move #${ move }`
              return (
                <div key={move} className='histoty'>
                  <button onClick={() => jumpTo(move)}>
                    {buttonSet}
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
