import './stylesheets/App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import Login from "./component/login.js"
import CreateAcc from "./component/createAcc.js"
import TicTacToe from './component/TicTacToe.js';


function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/create-account" element={<CreateAcc />}/>
        <Route path="tic-tac-toe" element={<TicTacToe />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
