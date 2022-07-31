import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Alert, Snackbar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { createTeam, loadAllUser } from '../../component/api/api';
import './team.scss';

function TeamSetting(props){
    const [div1, setDiv1] = useState("disable");
    const [div2, setDiv2] = useState("disable");

    // set data team
    const [team, setTeam] = useState("");
    const [count, setCount] = useState(0);

    const [arrN, setArrN] = useState([]);
    const [arrE, setArrE] = useState([]);

    // all user
    const [alluser, setAll] = useState([]);

    // alert success
    const [open, setOpen] = useState(false);
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    useEffect(() => {
        async function Load(){
            await loadAllUser().then(
                (res) => {
                    setAll(res.data.data);
                    //console.log(res.data.data);
                }
            )
        }
        Load();
        console.log(arrN, arrE);
    }, []);

    const removeUser = () => {
        const id1 = "count" + count;
        const id2 = "data" + count;
        //console.log(id);
        let re1 = document.getElementById(id1);
        //console.log(re);
        document.getElementById("adduser").removeChild(re1);
        let re2 = document.getElementById(id2);
        //console.log(re);
        document.getElementById("datauser").removeChild(re2);
    }

    const changeName = (val, count) => {
        const newArr = arrN.map((element, index) => {
            if (index === count){
                return val;
            }
            else{
                return element;
            }
        });
        console.log(newArr);
        setArrN(newArr);
        const id1 = "dataname" + count;
        document.getElementById(id1).textContent = val;
    }

    const changeEmail = (val, count) => {
        const newArr = arrE.map((element, index) => {
            if (index === count){
                return val;
            }
            else{
                return element;
            }
        });
        console.log(newArr);
        setArrE(newArr);
        const id2 = "dataemail" + count;
        document.getElementById(id2).textContent = val;
    }

    const addUser = (e, count) => {
        e.preventDefault();
        // create div and add form
        const div1 = document.createElement("div");
        div1.id = "count" + count;
        // create element
        const para1 = document.createElement("p");
        const node1 = document.createTextNode("Name");
        para1.appendChild(node1);
        div1.appendChild(para1);

        const input1 = document.createElement("input");
        arrN.push("");
        input1.addEventListener("change", function(){
            changeName(input1.value, count);
        });
        div1.appendChild(input1);

        const para2 = document.createElement("p");
        const node2 = document.createTextNode("Email");
        para2.appendChild(node2);
        div1.appendChild(para2);

        const input2 = document.createElement("input");
        arrE.push("");
        input2.addEventListener("change", function(){
            changeEmail(input2.value, count);
        });
        div1.appendChild(input2);

        const btn = document.createElement("button");
        const btntext = document.createTextNode("Remove");
        btn.appendChild(btntext);
        btn.className = "btn--remove";
        btn.addEventListener("click", function(event){
            event.preventDefault();
            removeUser();
        });
        div1.appendChild(btn);

        const hr = document.createElement("hr");
        hr.className = "hr";
        div1.appendChild(hr);
        // add div
        document.getElementById("adduser").appendChild(div1);


        //create and add data
        const div2 = document.createElement("div");
        div2.id = "data" + count;

        // create element
        const para3 = document.createElement("p");
        const node3 = document.createTextNode("");
        para3.id = "dataname" + count;
        para3.appendChild(node3);
        para3.className = "dataname";
        div2.appendChild(para3);

        const para4 = document.createElement("p");
        const node4 = document.createTextNode("");
        para4.id = "dataemail" + count;
        para4.appendChild(node4);
        para4.className = "dataemail";
        div2.appendChild(para4);
        div2.className = "dataauser";
        document.getElementById("datauser").appendChild(div2);

        // increase
        setCount(count + 1);
    }

    const handleAddUser = (e) => {
        e.preventDefault();
        async function create(data){
            await createTeam(data).then(
                (res) => {
                    console.log(res);
                    setOpen(true);
                    setTeam("");
                    setTimeout(() => { setOpen(false); window.location.href = "/home" }, 1500);
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
        create(
            {
                name: team, 
                arr: json,
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
                        Create team successfully!
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
                    <p className="team--content--form--title">Create A New Team</p>
                    <form className="form">
                        <p className="form--name">Team Name</p>
                        <input type="text" onChange={(e) => setTeam(e.target.value)} />
                        <p className="form--invite">Invite users</p>
                        <p className="form--des">
                            Invite users to create an account and join this team. 
                            Each user will be sent a confirmation email in which 
                            they can supply their own unique password
                        </p>
                        <div className="div--adduser" id="adduser"></div>
                        <button className="form--btn1" onClick={(e) => addUser(e, count)}>Add User</button>
                    </form>
                    <hr />
                    <button className="form--btn2" onClick={(e) => handleAddUser(e)}>Create Team</button>
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
                                <div className="div--datauser" id="datauser"></div>
                            </div>
                            </>
                        ):null
                    }
                </div>
            </div>
        </div>
    )
}

export default TeamSetting;