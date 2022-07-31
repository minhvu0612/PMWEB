import { Box, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import { signUp } from '../../component/api/api';
import { setLocal } from '../../component/localdata/data';
import "./signup.scss";

function Signup(){

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");

    // comfirm
    const [check1, setCheck1] = useState("disable");
    const [check2, setCheck2] = useState("disable");
    //load
    const [loading, setLoading] = useState("disable");

    const onSignup = (e) => {
        e.preventDefault();
        if (confirm === password){
            setCheck1("disable");
            const data = {
                name: name,
                email: email,
                password: password,
            }
            async function signup(data){
                await signUp(data).then(
                    (res) => {
                        if (res.data.alert === "success"){
                            setLocal(res.data);
                            setCheck2("disable");
                            console.log(localStorage);
                            setLoading("loading")
                            setTimeout(() => window.location.href = "/home", 1200);
                        }
                        else{
                            setCheck2("check2");
                        }
                    }
                )
            }
            signup(data);
        }
        else{
            setCheck1("check1");
        }
    }

    return(
        <div className="signup">
            <div className="signup--header">
                <p className="signup--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/"}>
                    Projekt
                </p>
                <div>
                    <p className="signup--text" onClick={() => window.location.href = "/signin"}>Log In</p>
                    <p className="signup--text" onClick={() => window.location.href = "/signup"}>Sign Up</p>
                </div>
            </div>
            <div className="signup--form">
                <form onSubmit={(e) => onSignup(e)}>
                    <p className="signup--website" style={{marginBottom: 15 + "px"}}>Sign up</p>
                    <p className='signup--form--text'>Name</p>
                    <input type="text" minLength={8} required className='signup--input' onChange={(e) => setName(e.target.value)} />
                    <p className='signup--form--text'>Email</p>
                    <input type="email" required className='signup--input' onChange={(e) => setEmail(e.target.value)} />
                    <p className='signup--form--text'>Password</p>
                    <input type="password" minLength={8} required className='signup--input' onChange={(e) => setPassword(e.target.value)} />
                    <p className='signup--form--text'>Confirm</p>
                    <input type="password" required className='signup--input' onChange={(e) => setConfirm(e.target.value)} />
                    <p className={check1}>Confirm is not valid with password</p>
                    <p className={check2}>Username or email was existed</p>
                    <br /><br />
                    <input type="submit" style={{display: "none"}} id="submit" />
                    <Button variant="outlined" size='small' 
                        onClick={() => document.getElementById("submit").click()}>Sign Up</Button>
                    <br /><br />
                    <p className='signup--form--link' onClick={() => window.location.href = "/signin"}>Log in</p>
                    <p className='signup--form--link' onClick={() => window.location.href = "/resend"}>
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

export default Signup;