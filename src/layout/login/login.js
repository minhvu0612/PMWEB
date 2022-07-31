import { Button, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { logIn } from '../../component/api/api';
import { setLocal } from '../../component/localdata/data';
import "./login.scss";

function Login(){

    const [loading, setLoading] = useState("disable");
    const [check2, setCheck2] = useState("disable");

    // data login
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // login
    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            email: email,
            password: password,
        };
        async function login(data){
            await logIn(data).then(
                (res) => {
                    if (res.data.alert === "success"){
                        setLocal(res.data);
                        setCheck2("disable");
                        setTimeout(() => window.location.href = "/home", 1200);
                        setLoading("loading")
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
                    onClick={() => window.location.href = "/"}>
                    Projekt
                </p>
                <div>
                    <p className="login--text" onClick={() => window.location.href = "/signin"}>Log In</p>
                    <p className="login--text" onClick={() => window.location.href = "/signup"}>Sign Up</p>
                </div>
            </div>
            <div className="login--form">
                <form onSubmit={(e) => handleLogin(e)}>
                    <p className="login--website" style={{marginBottom: 15 + "px"}}>Log in</p>
                    <p className='login--form--text'>Email</p>
                    <input type="email" className='login--input' onChange={(e) => setEmail(e.target.value)} />
                    <p className='login--form--text'>Password</p>
                    <input type="password" className='login--input' onChange={(e) => setPassword(e.target.value)} />
                    <p className={check2}>Account is not valid</p>
                    <br /><br />
                    <input type="submit" style={{display: "none"}} id="submit" />
                    <Button variant="outlined" size='small' 
                        onClick={() => document.getElementById("submit").click()}>Log In</Button>
                    <br /><br />
                    <p className='login--form--link' onClick={() => window.location.href = "/signup"}>Sign Up</p>
                    <p className='login--form--link'>Forgot your password</p>
                    <p className='login--form--link' onClick={() => window.location.href = "/resend"}>
                        Didn't receive confirmation instructions?
                    </p>
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

export default Login;