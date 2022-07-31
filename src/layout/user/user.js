import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useEffect, useState } from 'react';
import './../home/home.scss';
import './user.scss';

// import png
import welcome from "../../assets/welcome.PNG";
import { Alert, Snackbar } from '@mui/material';
import { removeLocal } from '../../component/localdata/data';
import { complete, loadAllProject, loadAllUit, loadAllUits, loadATeam } from '../../component/api/api';

function User(){

    const [div2, setDiv2] = useState("disable");

    // alert login success
    const [open, setOpen] = useState(true);

    // 
    const [check, setCheck] = useState(0);

    // team, project, activity
    const [team, setTeam] = useState([]);
    const [project, setProject] = useState([]);
    const [uit, setUit] = useState([]);

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const convertDate = (val) => {
        const d = new Date(val);
        var month = d.getMonth() + 1;
        return d.getFullYear() + "/" + month + "/" + d.getDate();
    }

    useEffect(() => {
        if (localStorage.getItem("name") === null){
            window.location.href = "/";
        }
        async function LoadTeam(){
            var teamcode = "";
            await loadAllUits().then(
                (res) => {
                    res.data.data.map((val) => {
                        if (localStorage.getItem("id") == val.user_id){
                            setTeam(val.team);
                            //console.log(val.team);
                            teamcode = val.teamcode;
                        }
                    });
                } 
            )
            await loadAllUit(teamcode).then(
                (res) => {
                    setUit(res.data.data);
                    //console.log(res.data);
                }
            )
            await loadAllProject().then(
                (res) => {
                    res.data.data.map((val) => {
                        if (val.teamcode === teamcode){
                            setProject(val);
                            //console.log(val);
                        }
                    });
                } 
            )
        }
        LoadTeam();
    }, []);

    const com = () => {
        const data = {
            code: project.code,
            arctime: new Date().getTime()
        }
        async function hoanthanh(data){
            await complete(data).then(
                (res) => {
                    console.log(res);
                }
            )
        }
        hoanthanh(data);
        //console.log(data);
    }

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
                            window.location.href = "/user";
                        }
                    }}>
                    Projekt
                </p>
                <div className="home--header--menu">
                    <div className="home--header--menu2" 
                        onMouseEnter={() => {setDiv2("div2")}}
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
                {
                (check === 0)?(
                    <>
                    <div className="home--content--main main--user">
                        <div className="main--project">
                            <p>Project Name: <b>{project.name}</b></p><br /><br />
                            <p>Content: <b>{project.content}</b></p><br /><br />
                            <p>Start: <b>{convertDate(project.startline)}</b></p><br /><br />
                            <p>Deadline: <b>{convertDate(project.deadline)}</b></p><br />
                        </div>
                        <div className="main--team">
                            <p>Team Name: <b>{team.name}</b></p><br /><br />
                        </div>
                    </div>
                    <hr />
                    <button className="main--btn" onClick={() => com()}>Hoàn thành</button>
                    </>
                ):(
                    <h1 style={{position: "absolute", top: 200 + "px", left: 630 + "px"}}>Chưa có project nào</h1>
                )
                }
            </div>
        </div>
    )
}

export default User;