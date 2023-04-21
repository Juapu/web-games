import './stylesheets/App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import {Switch} from 'react-router'
import Login from "./component/login.js"
import CreateAccount from "./component/createAccount.js"
import displayGame from "./component/displayGame.js"
import Game from "./component/game.js"


function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/create-account" element={<CreateAccount />}/>
        <Route path="/games" element={<displayGame />}/>
        <Route path="/play" element={<Game />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
