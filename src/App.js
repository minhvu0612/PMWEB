import './App.css';
import Welcome from './layout/welcome';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './layout/login/login';
import Signup from './layout/signup/signup';
import Resend from './layout/resend/resend';
import Home from './layout/home/home';
import Team from './layout/team/team';
import Project from './layout/project/project';
import { useEffect, useState } from 'react';
import { loadAllProject } from './component/api/api';
import ProjectSetting from './layout/project/showproject';
import User from './layout/user/user';

function App() {

  const [project, setAllProject] = useState([]);

  useEffect(() => {
    async function LoadProject(){
      await loadAllProject().then(
        (res) => {
          setAllProject(res.data.data);
        }
      )
    }
    LoadProject();
  }, []);

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
          {
            (project !== [])?(
              project.map((val) => {
                return (<Route exact path={"/project/" + val.code} element={<ProjectSetting val={val} />} />);
              })
            ):null
          }
          <Route exact path="/project/news" element={<Project />} />
          <Route exact path="/user" element={<User />} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
