import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import { useState } from 'react';
import axios from 'axios';

function TicTacToe() {

  const jsonBody = {
    gamename: "tic-tac-toe",
    gameState: {
      board: Array(9).fill(null),
      playerTurn: 'X', 
    },
  };
  axios.post(`http://localhost:4001/gamestate/create`, jsonBody).then((body) => {
    localStorage.setItem("gameid", body.data.gameid);
    console.log(body.data.gameid);
  }, (err) => {
    console.log("Error: ", err);
  });

  
  return (
    <div className="tic-tac-toe">
      <h1>Tic-Tac-Toe</h1>
     
      <Board />
   
    </div>
  );
}


export default TicTacToe;