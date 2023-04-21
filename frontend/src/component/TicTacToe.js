import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import { useState } from 'react';

function TicTacToe() {
  return (
    <div className="tic-tac-toe">
      <h1>Tic-Tac-Toe</h1>
     
      <Board />
   
    </div>
  );
}


export default TicTacToe;