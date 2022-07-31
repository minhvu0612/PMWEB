import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useEffect, useState } from 'react';
import './home.scss';

// import png
import welcome from "../../assets/welcome.PNG";
import { Alert, Snackbar } from '@mui/material';
import { removeLocal } from '../../component/localdata/data';
import { loadAllActivity, loadAllActProject, loadAllProject, loadAllTeam } from '../../component/api/api';
import TeamChild from '../../component/adduser/adduser';
import ProjectChild from '../../component/adduser/projectchild';
import ActChild from '../../component/adduser/activity';

function Home(){

    const [div1, setDiv1] = useState("disable");
    const [div2, setDiv2] = useState("disable");

    // alert login success
    const [open, setOpen] = useState(true);

    // team, project, activity
    const [allteam, setAllTeam] = useState([]);
    const [project, setAllProject] = useState([]);
    const [act, setAllAct] = useState([]);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        if (localStorage.getItem("name") === null){
            window.location.href = "/";
        }
        async function LoadTeam(){
            await loadAllTeam().then(
                (res) => {
                    setAllTeam(res.data.data);
                    //console.log(res.data.data);
                } 
            )
        }
        async function LoadProject(){
            await loadAllProject().then(
                (res) => {
                    setAllProject(res.data.data);
                    //console.log(res.data.data);
                } 
            )
        }
        async function LoadAct(){
            var arr = [];
            await loadAllActivity().then(
                (res) => {
                    res.data.data.map((val) => {
                        arr.push({
                            u: val.user.name,
                            code: val.teamcode,
                            st: val.state,
                            date: val.created_at
                        });
                    })
                } 
            )
            await loadAllActProject().then(
                (res) => {
                    res.data.data.map((val) => {
                        arr.push({
                            u: val.user.name,
                            code: val.projectcode,
                            st: val.state,
                            date: val.created_at
                        });
                    })
                } 
            )
            setAllAct(arr);
        }
        LoadTeam();
        LoadProject();
        LoadAct();
    }, []);

    return(
        <div className="home">
            <div style={{position: "absolute"}}>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} 
                    open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: "green" }}>
                        Login successfully!
                    </Alert>
                </Snackbar>
            </div>
            <div className="home--header">
                <p className="project--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => {
                        if (localStorage.getItem("name") === null){
                            window.location.href = "/";
                        }
                        else{
                            window.location.href = "/home";
                        }
                    }}>
                    Projekt
                </p>
                <div className="home--header--menu">
                    <div className="home--header--menu1" 
                        onMouseEnter={() => {setDiv2("disable"); setDiv1("div1")}}
                        onMouseLeave={() => setTimeout(() => setDiv1("disable"), 1000)}
                    >
                        <p className="home--text">
                            New <KeyboardArrowDownIcon />
                        </p>
                        <div className={div1}>
                            <p onClick={() => window.location.href = "/project/news"}>Project</p>
                            <p onClick={() => window.location.href = "/team/news"}>Team</p>
                        </div>
                    </div>
                    <div className="home--header--menu2" 
                        onMouseEnter={() => {setDiv1("disable"); setDiv2("div2")}}
                        onMouseLeave={() => setTimeout(() => setDiv2("disable"), 500)}
                    >
                        <p className="home--text">
                            Account <KeyboardArrowDownIcon />
                        </p>
                        <div className={div2}>
                            <p>{localStorage.getItem("name")}</p>
                            <p onClick={() => {removeLocal(); window.location.href = "/"}}>Log Out</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="home--content">
                <div className="home--content--header">
                    <p>
                        Welcome {localStorage.getItem("name")} 
                        <img style={{width: 30 + "px", height: 30 + "px"}} src={welcome} alt="welcome" />
                    </p>
                    <hr />
                </div>
                <div className="home--content--main">
                    <div className="home--content--main--project">
                        <div className="home--content--title">
                            <div>
                                <p>My Projects <button className="btn--count">{project.length}</button></p>
                                <button className="home--addbtn" onClick={() => window.location.href = "/project/news"}>
                                    <AddSharpIcon sx={{fontSize: 12 + "px", color: "#3273dc"}} />
                                </button>
                            </div>
                            <hr />
                            {
                                (project !== [])?(
                                    project.map((val) => (
                                    <>
                                        <ProjectChild project={val} />
                                        <hr />
                                    </>
                                    ))
                                ):null
                            }
                        </div>
                    </div>
                    <div className="home--content--main--team">
                        <div className="home--content--title">
                            <div>
                                <p>My Teams <button className="btn--count">{allteam.length}</button></p>
                                <button className="home--addbtn" onClick={() => window.location.href = "/team/news"}>
                                    <AddSharpIcon sx={{fontSize: 12 + "px", color: "#3273dc"}} />
                                </button>
                            </div>
                            <hr />
                            {
                                (allteam !== [])?(
                                    allteam.map((val) => (
                                    <>
                                        <TeamChild team={val} />
                                        <hr />
                                    </>
                                    ))
                                ):null
                            }
                        </div>
                    </div>
                    <div className="home--content--main--activity">
                        <div className="home--content--title">
                            <div>
                                <p>Activities</p>
                            </div>
                            <hr />
                            {
                                (act !== [])?(
                                    act.map((val) => (
                                    <>
                                        <ActChild state={val.st} user={val.u} code={val.code} date={val.date} />
                                        <hr />
                                    </>
                                    ))
                                ):null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;