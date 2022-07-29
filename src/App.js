import './App.css';
import Welcome from './layout/welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './layout/login/login';
import Signup from './layout/signup/signup';
import Resend from './layout/resend/resend';
import Home from './layout/home/home';
import Team from './layout/team/team';
import Project from './layout/project/project';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Welcome />} /> 
          <Route exact path="/signin" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} /> 
          <Route exact path="/resend" element={<Resend />} />  
          <Route exact path="/home" element={<Home />} />  
          <Route exact path="/team/news" element={<Team />} /> 
          <Route exact path="/project/news" element={<Project />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
