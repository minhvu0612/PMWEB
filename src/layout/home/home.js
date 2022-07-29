import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import { useEffect, useState } from 'react';
import './home.scss';

// import png
import welcome from "../../assets/welcome.PNG";
import { Alert, Snackbar } from '@mui/material';
import { removeLocal } from '../../component/localdata/data';
import { loadAllTeam, loadAllUit } from '../../component/api/api';
import TeamChild from '../../component/adduser/adduser';

function Home(){

    const [div1, setDiv1] = useState("disable");
    const [div2, setDiv2] = useState("disable");

    // alert login success
    const [open, setOpen] = useState(true);

    // team
    const [allteam, setAllTeam] = useState([]);
    // all user in team
    const [alluserteam, setAllUserTeam] = useState([]);

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
        async function LoadUit(){
            await loadAllUit().then(
                (res) => {
                    setAllUserTeam(res.data.data);
                    //console.log(res.data.data);
                } 
            )
        }
        LoadTeam();
        LoadUit();
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
                <p className="home--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/"}>
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
                                <p>My Projects <button className="btn--count">{allteam.length}</button></p>
                                <button className="home--addbtn" onClick={() => window.location.href = "/project/news"}>
                                    <AddSharpIcon sx={{fontSize: 12 + "px", color: "#3273dc"}} />
                                </button>
                            </div>
                            <hr />
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
                                        <TeamChild team={val} arr={alluserteam} />
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;