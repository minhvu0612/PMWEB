import { Button } from '@mui/material';
import "./resend.scss";

function Resend(){

    return(
        <div className="resend">
            <div className="resend--header">
                <p className="resend--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/"}>
                    Projekt
                </p>
                <div>
                    <p className="resend--text">Log In</p>
                    <p className="resend--text">Sign Up</p>
                </div>
            </div>
            <div className="resend--form">
                <form>
                    <p className="resend--website" style={{marginBottom: 15 + "px"}}>Resend Confirm Instructions</p>
                    <p className='resend--form--text'>Email</p>
                    <input type="email" className='resend--input' />
                    <br /><br />
                    <Button variant="contained">Resend Confirm Instructions</Button>
                    <br /><br />
                    <p className='resend--form--link' onClick={() => window.location.href = "/signin"}>Log In</p>
                    <p className='resend--form--link' onClick={() => window.location.href = "/signup"}>Sign Up</p>
                    <p className='resend--form--link'>Forgot your password</p>
                </form>
            </div>
        </div>
    );
}

export default Resend;