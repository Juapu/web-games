import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import iconIMG from '../images/tic-tac-toe.png';
import computerIMG from '../images/computer.png';
import { Link, useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import axios from 'axios';


function TicTacToe() {

  var username2Ref = useRef("");
  const navigate = useNavigate();

  var [username1, setUsername1] = useState();
  var [curGameId, setCurGameId] = useState(null);

  axios.get(`http://localhost:4001/user/get`, {
    headers: {
      'token': localStorage.getItem("token"),
    }
  }).then((body) => {
        // console.log(body);
        console.log(body.data);
        //user1 = body.data;
        //curGameId = body.data.currentGameID;
        setCurGameId(body.data.currentGameID);
        console.log("Ran");
        setUsername1(body.data.username);
        //username1 = body.data.username;

      }, (err) => {
        console.log("Error: ", err);
  });

  function createGame() {
    const jsonBody = {
      gamename: "tic-tac-toe",
      gameState: {
        board: Array(9).fill(null),
        playerTurn: 'X', 
      },
      username1: username1,
      username2: username2Ref.current.value,
    };

    console.log(jsonBody);
  
    axios.post(`http://localhost:4001/gamestate/create`, jsonBody).then((body) => {
      localStorage.setItem("gameid", body.data.gameid);
      console.log(body.data.gameid);
    }, (err) => {
      console.log("Error: ", err);
    });
  }

  // Check if 1st user already has a gameid
  console.log(curGameId);
  if (curGameId) {
    localStorage.setItem("gameid", curGameId);
    navigate('/tic-tac-toe-game');
  }

  /*var [user1, setUser1] = useState();
  var [curGameId, setCurGameId] = useState();

  useEffect(() => {
    if (user1 && user1.currentGameID !== null) {
      navigate('/tic-tac-toe-game');
    }
  }, [user1]);

  axios.get(`http://localhost:4001/user/get`, {
      headers: {
        'token': localStorage.getItem("token"),
      }
    }).then((body) => {
          console.log(body.data);
          user1 = body.data;
          curGameId = body.data.currentGameID;
          username1 = body.data.username;
        }, (err) => {
          console.log("Error: ", err);
    }); */
  
  /* const jsonBody = {
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
  }); */

  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <img src={iconIMG} alt="Tic Tac Toe"></img>
      <label htmlFor="username">Opponent Username:</label>
      <input type="text" id="username" ref={username2Ref} />
      <Link to="/tic-tac-toe-game">
        <button onClick = {(e) => createGame(e)}>Play Online</button>
      </Link>
    </div>
  );
}


export default TicTacToe;