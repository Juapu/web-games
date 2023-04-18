import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}

export default Game;