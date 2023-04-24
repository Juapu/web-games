import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import iconIMG from '../images/tic-tac-toe.png';
import computerIMG from '../images/computer.png';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect } from 'react';

function TicTacToe() {

  const username1 = null;
  const username2Ref = useRef();

  const user1 = null;
  axios.get(`http://localhost:4001/user/get`).then((body) => {
        // console.log(body);
        user1 = body.data.user;
        username1 = body.data.user.username;
      }, (err) => {
        console.log("Error: ", err);
  });

  // Check if 1st user already has a gameid
  if (user1.currentGameID != null) {
    navigate('/tic-tac-toe-game');
  }

  const jsonBody = {
    gamename: "tic-tac-toe",
    gameState: {
      board: Array(9).fill(null),
      playerTurn: 'X', 
    },
    username1: username1,
    username2: username2Ref.current.value,
  };
  
  axios.post(`http://localhost:4001/gamestate/create`, jsonBody).then((body) => {
    localStorage.setItem("gameid", body.data.gameid);
    console.log(body.data.gameid);
  }, (err) => {
    console.log("Error: ", err);
  });

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <img src={iconIMG} alt="Tic Tac Toe"></img>
      <Link to="/tic-tac-toe-game">
        <button>Play Online</button>
      </Link>
      <label htmlFor="username">Opponent Username:</label>
      <input type="text" id="username" ref={username2Ref}/>
    </div>
  );
}


export default TicTacToe;