import './stylesheets/App.css';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom"
import {Switch} from 'react-router'
import Login from "./component/login.js"
import CreateAcc from "./component/createAcc.js"


function App() {
  return (
  
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/create-account" element={<CreateAcc />}/>
      </Routes>
    </Router>
    
  );
}

export default App;
