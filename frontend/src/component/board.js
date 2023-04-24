import {React, useState, useEffect} from 'react';
import '../stylesheets/Board.css';
import Square from './square';
import Player from './player';
import axios from 'axios';


function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerTurn, setPlayerTurn] = useState('X');

  // Periodically retrieves latest board version from remote db
  useEffect(() => {

    function getLatestGamestate() {
      const gameid = localStorage.getItem("gameid");
      fetch(axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
        setPlayerTurn(body.data.gameState.playerTurn);
        setSquares(body.data.gameState.board);
        console.log(body);
      }, (err) => {
        console.log("Error: ", err);
      }));
    }
    const interval = setInterval(() => getLatestGamestate(), 4000); // 4 seconds
    return () => {
      clearInterval(interval);
    }
  }, []);

  function handleClick(i) {

    // Check if board has been updated since the last player took their turn
    // If board has not changed, do not let this user make changes
    let gameid = localStorage.getItem("gameid");
    axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
      console.log("Board: " + body.data.gameState.board);
    }, (err) => {
      console.log("Error: ", err);
    });
    // If board is changed, let them keep going

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    /*if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    } */
    setPlayerTurn(playerTurn);
    nextSquares[i] = playerTurn;
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    //TODO Check valid move before calling?
    // call to update gamestate every time we change the state
    const jsonBody = {
      gamename: "tic-tac-toe",
      gameid: gameid,
      gameState: {
        board: nextSquares,
        playerTurn: xIsNext ? 'X' : 'O', // Player 0 has 'X' and Player 1 has 'O'
      }
    };

    axios.put(`http://localhost:4001/gamestate/update`, jsonBody).then((body) => {
      console.log(body);
    }, (err) => {
      console.log("Error: ", err);
    });

    // store board state in a variable
    // GET call here
    /* axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
        console.log(body);
        setPrevSquares(body.data.gameState.board);
      }, (err) => {
        console.log("Error: ", err);
      }); */
  }

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }


  return (
    <>
      
      <div className="status">{status}</div>

      <div className="displayPlayers">
          <div className='player'>
            <Player xIsNext={xIsNext} player="X" side="left"/>
          </div>

          <div className='player'>
            <Player xIsNext={xIsNext} player="O" side="right"/> 
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


