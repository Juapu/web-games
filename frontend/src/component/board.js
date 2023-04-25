import {React, useState, useEffect} from 'react';
import '../stylesheets/Board.css';
import Square from './square';
import Player from './player';
import axios from 'axios';


function Board() {
  // const [xIsNext, setXIsNext] = useState(true);
  const gameid = localStorage.getItem("gameid");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerUsername, setPlayerUsername] = useState("X");
  const [playerTurn, setPlayerTurn] = useState("");
  const [currentTurn, setCurrentTurn] = useState("X");
  const [status, setStatus] = useState("");

  // Authenticate user to retrieve username
  axios.get(`http://localhost:4001/user/get`, {
    headers: {
      'token': localStorage.getItem("token"),
    }
  }).then((body) => {
        console.log(body.data);
        setPlayerUsername(body.data.username);
      }, (err) => {
        console.log("Error: ", err);
  });

  // fetch current gamestate to assign a playerTurn
  fetch(axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
        if (body.data.username1 === playerUsername) {
          setPlayerTurn('X');
        } else if (body.data.username2 === playerUsername) {
          setPlayerTurn('O');
        } else {
          console.error("You are not playing in this game")
        }
      }, (err) => {
        console.log("Error: ", err);
      }));

  // Periodically retrieves latest board version from remote db
  useEffect(() => {
    function getLatestGamestate() {
      fetch(axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
        setCurrentTurn(body.data.gameState.playerTurn);
        setSquares(body.data.gameState.board);
        console.log(body);
      }, (err) => {
        console.log("Error: ", err);
      }));
    }
    const interval = setInterval(() => getLatestGamestate(), 1000); // 4 seconds
    return () => {
      clearInterval(interval);
    }
  }, [gameid]);

  function handleClick(i) {
    let gameid = localStorage.getItem("gameid");
    // Check if board has been updated since the last player took their turn
    axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
      console.log("Board: " + body.data.gameState.board);
      setCurrentTurn(body.data.gameState.playerTurn);
      setSquares(body.data.gameState.board);
    }, (err) => {
      console.log("Error: ", err);
    });

    // If not the user's turn, do not let them make a move
    if (currentTurn !== playerTurn) {
      console.log("not your turn silly~!");
      return;
    }

    // If game has been won, don't let another move be played
    if (calculateWinner(squares)) {
      return;
    }

    //TODO Check valid move before calling?

    // Update local gamestate
    const nextSquares = squares.slice();
    nextSquares[i] = currentTurn;
    setSquares(nextSquares);
    setCurrentTurn(currentTurn === 'X' ? 'O' : 'X');

    // Update remote gamestate
    const jsonBody = {
      gamename: "tic-tac-toe",
      gameid: gameid,
      gameState: {
        board: nextSquares,
        playerTurn: currentTurn, // Player 0 has 'X' and Player 1 has 'O'
      }
    };
    axios.put(`http://localhost:4001/gamestate/update`, jsonBody).then((body) => {
      //TODO: implement authentication for gamestate updates
      console.log(body);
    }, (err) => {
      console.log("Error: ", err);
    });

    // Update Status UI
    const winner = calculateWinner(nextSquares);
    if (winner) {
      setStatus('Winner: ' + winner);
    } else {
      setStatus('Next player: ' + (currentTurn));
    }
  }

  return (
    <>
      
      <div className="status">{status}</div>

      <div className="displayPlayers">
          <div className='player'>
            <Player xIsNext={currentTurn === 'X'} player="X" side="left"/>
          </div>

          <div className='player'>
            <Player xIsNext={currentTurn === 'X'} player="O" side="right"/> 
          </div>

      </div>
      
   

      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


export default Board;


