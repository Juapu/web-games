import React from 'react';
import '../stylesheets/Game.css';
import Board from './board';
import { useState, useEffect } from 'react';
import axios from 'axios';

function TicTacToe() {

  const [gameid, setGameid] = useState("");

  useEffect( () => {

    const jsonBody = {
      gamename: "tic-tac-toe",
      gameState: { board: Array(9).fill(null), playerTurn: 0 },
    };

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
  
    // const headers = { "Content-Type": "application/json",  };
     // headers.append('Accept', 'application/json');

    axios.get(`http://localhost:4001/create`, jsonBody, headers)
        .then( res => {
            const gameid = res.gameid;
            console.log("Call finished" + gameid);
            setGameid(gameid);
        })
  }, []);
 
  
  return (
    <div className="tic-tac-toe">
      <h1>Tic Tac Toe</h1>
      <p>The gameid is {gameid}</p>
      <div className="center">
        <Board />
      </div>
    </div>
  );
}


export default TicTacToe;