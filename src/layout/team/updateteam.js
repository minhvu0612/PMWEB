import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Alert, Snackbar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { loadAllUit, updateTeam } from '../../component/api/api';
import { removeLocal } from '../../component/localdata/data';
import './team.scss';

function UpdateTeam(props){

    const [div1, setDiv1] = useState("disable");
    const [div2, setDiv2] = useState("disable");
    const [loading, setLoading] = useState("disable");

    // set data team
    const [team, setTeam] = useState(props.val.name);
    const [uits, setUit] = useState([]);

    // set arr
    const [arrN, setArrN] = useState([]);
    const [arrE, setArrE] = useState([]);
    
    // set remove arr
    const [remove, setRemove] = useState([]);

    // all user
    const [alluser, setAll] = useState([]);

    // set cur data
    const [curN, setCurN] = useState("");
    const [curE, setCurE] = useState("");

    // alert success
    const [open, setOpen] = useState(false);
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
     
    useEffect(() => {
        async function loadUIT(code){
            await loadAllUit(code).then(
                (res) => {
                    setUit(res.data.data);
                    var arr1 = [];
                    var arr2 = [];
                    res.data.data.map((val) => {
                        arr1.push(val.user.name);
                        arr2.push(val.user.email);
                    });
                    setArrN(arr1);
                    setArrE(arr2);
                }
            )
        }
        async function Load(){
            await loadAllUser().then(
                (res) => {
                    setAll(res.data.data);
                    //console.log(res.data.data);
                }
            )
        }
        Load();
        loadUIT(props.val.code);
    }, []);

    const handleRemove = (val1, val2, key) => {
        var newarr1 = arrN.filter(item => item !== val1)
        var newarr2 = arrE.filter(item => item !== val2)
        setArrN(newarr1);
        setArrE(newarr2);
        setRemove([...remove, uits[key].user_id]);
        console.log(newarr1, newarr2, remove);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        console.log(curE, curN);
        if (curE === "" || curN === ""){

        }
        else{
            setArrN([...arrN, curN]);
            setArrE([...arrE, curE]);
        }
    }
    
    const update = (e) => {
        e.preventDefault();
        async function create(data){
            await updateTeam(data).then(
                (res) => {
                    console.log(res);
                    setOpen(true);
                    setTeam("");
                    setTimeout(() => { setOpen(false); window.location.href = "/home" }, 2000);
                    setLoading("loading")
                }
            )
        }
        var arr = [];
        arrN.map((val, index) => {
            alluser.map((value) => {
                if (arrN[index] === value.name && arrE[index] === value.email){
                    arr.push(value.id);
                }
            })
        })
        let json = JSON.stringify(arr);
        console.log(json);
        let rem = JSON.stringify(remove);
        create(
            {
                name: team, 
                arr: json,
                remove: rem,
                user_id: parseInt(localStorage.getItem("id")),
            }
        );
    }
    
    return(
        <div className="team">
            <div style={{position: "absolute"}}>
                <Snackbar anchorOrigin={{ vertical: "top", horizontal: "right" }} 
                    open={open} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%', color: "green" }}>
                        Update team successfully!
                    </Alert>
                </Snackbar>
            </div>
            <div className="team--header">
                <p className="team--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/home"}>
                    Projekt
                </p>
                <div className="team--header--menu">
                    <div className="team--header--menu1" 
                        onMouseEnter={() => {setDiv2("disable"); setDiv1("div1")}}
                        onMouseLeave={() => setTimeout(() => setDiv1("disable"), 1000)}
                    >
                        <p className="team--text">
                            New <KeyboardArrowDownIcon />
                        </p>
                        <div className={div1}>
                            <p>Project</p>
                            <p>Team</p>
                        </div>
                    </div>
                    <div className="team--header--menu2" 
                        onMouseEnter={() => {setDiv1("disable"); setDiv2("div2")}}
                        onMouseLeave={() => setTimeout(() => setDiv2("disable"), 1000)}
                    >
                        <p className="team--text">
                            Account <KeyboardArrowDownIcon />
                        </p>
                        <div className={div2}>
                            <p onClick={() => window.location.href = "/profile"}>{localStorage.getItem("name")}</p>
                            <p onClick={() => {removeLocal(); window.location.href = "/"}}>Log Out</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="team--content">
                <div className="team--content--form">
                    <p className="team--content--form--title">Update Team</p>
                    <form className="form">
                        <p className="form--name">Team Name</p>
                        <input type="text" defaultValue={team} onChange={(e) => setTeam(e.target.value)} />
                        <p className="form--invite">Invite users</p>
                        <p className="form--des">
                            Invite users to create an account and join this team. 
                            Each user will be sent a confirmation email in which 
                            they can supply their own unique password
                        </p>
                        <div className="div--adduser" id="adduser">
                            <p style={{fontWeight: "bold"}}>Name</p>
                            <input type="text" onChange={(e) => setCurN(e.target.value)} />
                            <p style={{fontWeight: "bold"}}>Email</p>
                            <input type="email" onChange={(e) => setCurE(e.target.value)} />
                        </div>
                        <button className="form--btn1" style={{marginTop: 10 + "px"}} onClick={(e) => handleAdd(e)}>Add User</button>
                    </form>
                    <hr />
                    <button className="form--btn2" onClick={(e) => update(e)}>Update Team</button>
                </div>
                <div className="team--content--main">
                    <p className="team--name--data">{team}</p>
                    {
                        (team !== "")?(
                            <>
                            <div className="team--data">
                                <div className="team--data--title">
                                    <p className="team--data--title--name">Name</p>
                                    <p className="team--data--title--email">Email</p>
                                </div>
                                <hr />
                                <div className="div--datauser" id="datauser">
                                    {
                                        (uits !== null)?(
                                            arrN.map((val, key) => {
                                                return(
                                                    <div className='dataauser'>
                                                        <p className='dataname'>{arrN[key]}</p>
                                                        <p className='dataemail'>{arrE[key]}</p>
                                                        <button className='del--btn' onClick={() => handleRemove(arrN[key], arrE[key], key)}>
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                )
                                            })
                                        ):null
                                    }
                                </div>
                            </div>
                            </>
                        ):null
                    }
                </div>
            </div>
            <div className={loading}>
                <Box sx={{ width: '10%'}}>
                    <p className="login--website" style={{color: "white"}}>Loading ...</p><br />
                    <CircularProgress />
                </Box>
            </div>
        </div>
    )
}
export default UpdateTeam;