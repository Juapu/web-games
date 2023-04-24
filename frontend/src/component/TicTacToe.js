import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import axios from 'axios';

function TicTacToe() {
  
  return (
    <div className="tic-tac-toe">
      <h1>Tic-Tac-Toe</h1>
        <Board />
   
    </div>
  );
}


export default TicTacToe;

// Login page
// User 1 logs in
// Checks if User1.gameid exists, if not let them keep going
// User 1 inputs User 2
// User2.gameid = the one User1 put in
// User 2 logs in
// Checks if User2.gameid exists, since it does automatically move them to the TicTacToe board with assoc gameid
// Start running get calls from the same gameid