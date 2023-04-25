import {React, useState, useEffect} from 'react';
import '../stylesheets/Board.css';
import Square from './square';
import Player from './player';
import axios from 'axios';


function Board() {
  // const [xIsNext, setXIsNext] = useState(true);
  const gameid = localStorage.getItem("gameid");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [playerUsername, setPlayerUsername] = useState("");
  const [localPlayerTurn, setLocalPlayerTurn] = useState("");
  const [playerTurn, setPlayerTurn] = useState(localStorage.getItem("player"));
  const [status, setStatus] = useState("");

  useEffect(() => {
    // Authenticate user to retrieve username
    axios.get(`http://localhost:4001/user/get`, {
      headers: {
        'token': localStorage.getItem("token"),
      }
    }).then((body) => {
      setPlayerUsername(body.data.username);
    }, (err) => {
      console.log("Error: ", err);
    });
  }, []);

  useEffect(() => {
    // fetch current gamestate to assign a playerTurn
    axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
      if (body.data.gameState.username1 === playerUsername) {
        setLocalPlayerTurn('X');
      } else if (body.data.gameState.username2 === playerUsername) {
        setLocalPlayerTurn('O');
      } else {
        console.error([body.data.gameState.username1, body.data.gameState.username2, playerUsername]);
      }
    }, (err) => {
      console.log("Error: ", err);
    });
  }, [playerUsername, gameid]);

  // Periodically retrieves latest board version from remote db
  useEffect(() => {
    function getLatestGamestate() {
      fetch(axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
        //setPlayerTurn(body.data.gameState.playerTurn);
        setSquares(body.data.gameState.board);
        console.log(body);
      }, (err) => {
        console.log("Error: ", err);
      }));
    }
    const interval = setInterval(() => getLatestGamestate(), 1000); // 1 second
    return () => {
      clearInterval(interval);
    }
  }, [gameid]);

  function handleClick(i) {
    // Check if board has been updated since the last player took their turn
    axios.get(`http://localhost:4001/gamestate/get?gameid=${gameid}`).then((body) => {
      console.log("Board: " + body.data.gameState.board);
      //setPlayerTurn(body.data.gameState.playerTurn);
      setSquares(body.data.gameState.board);
    }, (err) => {
      console.log("Error: ", err);
    });

    // If not the user's turn, do not let them make a move
    /*if (playerTurn !== localPlayerTurn) {
      console.log("not your turn silly~!");
      return;
    } */

    // If game has been won, don't let another move be played
    if (calculateWinner(squares)) {
      return;
    }

    //TODO Check valid move before calling?

    // Update local gamestate
    const nextSquares = squares.slice();
    nextSquares[i] = playerTurn;
    setSquares(nextSquares);

    const jsonBody = {
      gamename: "tic-tac-toe",
      gameid: gameid,
      gameState: {
        board: nextSquares,
        playerTurn: playerTurn, // Player 0 has 'X' and Player 1 has 'O'
      }
    };

    axios.put(`http://localhost:4001/gamestate/update`, jsonBody).then((body) => {
      //TODO: implement authentication for gamestate updates
      console.log(body);
    }, (err) => {
      console.log("Error: ", err);
    });

    const winner = calculateWinner(nextSquares);
    if (winner) {
      console.log("Winner Detected");
      setStatus('Winner: ' + winner);
    } else {
      setStatus('Next player: ' + (playerTurn));
    }
    /*setPlayerTurn(playerTurn === "X" ? "O" : "X", () => {
      console.log("Set playerTurn to: ", playerTurn);

      // Update remote gamestate
      const jsonBody = {
        gamename: "tic-tac-toe",
        gameid: gameid,
        gameState: {
          board: nextSquares,
          playerTurn: playerTurn, // Player 0 has 'X' and Player 1 has 'O'
        }
      };

      console.log("Posting to database: ", jsonBody);

      axios.put(`http://localhost:4001/gamestate/update`, jsonBody).then((body) => {
        //TODO: implement authentication for gamestate updates
        console.log(body);
      }, (err) => {
        console.log("Error: ", err);
      });

      // Update Status UI
      const winner = calculateWinner(nextSquares);
      if (winner) {
        console.log("Winner Detected");
        setStatus('Winner: ' + winner);
      } else {
        setStatus('Next player: ' + (playerTurn));
      }
    }); */
  }

  return (
    <>
      
      <div className="status">{status}</div>

      <div className="displayPlayers">
          <div className='player'>
            <Player xIsNext={playerTurn === 'X'} player="X" side="left"/>
          </div>

          <div className='player'>
            <Player xIsNext={playerTurn === 'X'} player="O" side="right"/> 
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


