import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import iconIMG from '../images/tic-tac-toe.png';
import computerIMG from '../images/computer.png';
import { Link } from 'react-router-dom';

function TicTacToe() {

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <img src={iconIMG} alt="Tic Tac Toe"></img>
      <Link to="/tic-tac-toe-game">
        <button>Play Online</button>
      </Link>
    </div>
  );
}


export default TicTacToe;