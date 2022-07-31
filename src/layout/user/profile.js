import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { logIn, updateUser } from '../../component/api/api';
import { setLocal } from '../../component/localdata/data';
import "./../login/login.scss";

function Profile(){

    const [loading, setLoading] = useState("disable");
    const [check2, setCheck2] = useState("disable");

    // data login
    const [name, setName] = useState(localStorage.getItem("name"));
    const [email, setEmail] = useState(localStorage.getItem("email"));
    const [password, setPassword] = useState("");

    // login
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            id: localStorage.getItem("id"),
            name: name,
            email: email,
            password: password,
        };
        console.log(data);
        async function login(data){
            await updateUser(data).then(
                (res) => {
                    console.log(res);
                    if (res.data.alert === "success"){
                        setLocal(res.data);
                        setCheck2("disable");
                        setTimeout(() => window.location.href = "/home", 1200);
                        setLoading("loading");
                    }
                    else{
                        setCheck2("check2");
                    }
                }
            )
        }
        login(data);
    }

    return(
        <div className="login">
            <div className="login--header">
                <p className="login--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/home"}>
                    Projekt
                </p>
            </div>
            <div className="login--form">
                <form onSubmit={(e) => handleLogin(e)}>
                    <p className="login--website" style={{marginBottom: 15 + "px"}}>Project</p>
                    <p className='login--form--text'>Name</p>
                    <input type="type" className='login--input' defaultValue={name} onChange={(e) => setName(e.target.value)} />
                    <p className='login--form--text'>Email</p>
                    <input type="email" className='login--input' defaultValue={email} onChange={(e) => setEmail(e.target.value)} />
                    <p className='login--form--text'>Password</p>
                    <input type="password" className='login--input' defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
                    <p className={check2}>Account is not valid</p>
                    <br /><br />
                    <input type="submit" style={{display: "none"}} id="submit" />
                    <Button variant="outlined" size='small' 
                        onClick={() => document.getElementById("submit").click()}>Change</Button>
                    <br /><br />
                </form>
            </div>
            <div className={loading}>
                <Box sx={{ width: '10%'}}>
                    <p className="login--website" style={{color: "white"}}>Loading ...</p><br />
                    <CircularProgress />
                </Box>
            </div>
        </div>
    );
}

export default Profile;