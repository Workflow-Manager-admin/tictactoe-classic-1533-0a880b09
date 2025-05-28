import React, { useState, useCallback } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O';
type BoardState = (Player | null)[];

interface TicTacToeProps {
  // Add props if needed in the future
}

const TicTacToe: React.FC<TicTacToeProps> = () => {
  const [board, setBoard] = useState<BoardState>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | 'Draw' | null>(null);

  // Check for winner
  const checkWinner = useCallback((boardState: BoardState): Player | 'Draw' | null => {
    // Winning combinations
    const lines = [
      [0, 1, 2], // top row
      [3, 4, 5], // middle row
      [6, 7, 8], // bottom row
      [0, 3, 6], // left column
      [1, 4, 7], // middle column
      [2, 5, 8], // right column
      [0, 4, 8], // diagonal
      [2, 4, 6], // diagonal
    ];

    // Check for winner
    for (const [a, b, c] of lines) {
      if (
        boardState[a] &&
        boardState[a] === boardState[b] &&
        boardState[a] === boardState[c]
      ) {
        return boardState[a];
      }
    }

    // Check for draw
    if (!boardState.includes(null)) {
      return 'Draw';
    }

    return null;
  }, []);

  // Handle cell click
  const handleCellClick = (index: number) => {
    if (board[index] || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);

    const result = checkWinner(newBoard);
    if (result) {
      setGameOver(true);
      setWinner(result);
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  // Reset game
  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setGameOver(false);
    setWinner(null);
  };

  return (
    <div className="tictactoe-container">
      <h1>Tic Tac Toe Classic</h1>
      
      <div className="game-status">
        {winner ? (
          <p>{winner === 'Draw' ? "It's a Draw!" : `Player ${winner} Wins!`}</p>
        ) : (
          <p>Current Player: {currentPlayer}</p>
        )}
      </div>

      <div className="game-board">
        {board.map((cell, index) => (
          <button
            key={index}
            className="cell"
            onClick={() => handleCellClick(index)}
            disabled={gameOver}
          >
            {cell}
          </button>
        ))}
      </div>

      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
};

export default TicTacToe;
