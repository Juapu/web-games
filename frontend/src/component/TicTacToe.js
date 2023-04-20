import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import { useState } from 'react';

function TicTacToe() {
  return (
    <div className="tic-tac-toe">
      <div className="tic-tac-toe-board">
        <Board />
      </div>
    </div>
  );
}


export default TicTacToe;