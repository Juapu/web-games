import './stylesheets/App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter, Link} from "react-router-dom"
import Login from "./component/login.js"
import CreateAcc from "./component/createAcc.js"
import TicTacToe from './component/TicTacToe.js';
import TicTacToeStart from './component/TicTacToeStart';


function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/create-account" element={<CreateAcc />}/>
        <Route path="tic-tac-toe" element={<TicTacToeStart />}/>
        <Route path="tic-tac-toe-game" element={<TicTacToe />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
