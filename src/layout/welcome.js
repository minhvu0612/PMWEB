
import { Button } from '@mui/material';
import './webcome.scss';

function Welcome(){

    return (
        <div className="welcome">
            <div className="welcome--header">
                <p className="welcome--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/"}>
                    Projekt
                </p>
                <div>
                    <p className="welcome--text" onClick={() => window.location.href = "/signin"}>Log In</p>
                    <p className="welcome--text" onClick={() => window.location.href = "/signup"}>Sign Up</p>
                </div>
            </div>
            <div className="welcome--title">
                <div>
                    <p className="welcome--website">Welcome to Projekt</p>
                    <p className="welcome--text">Website project management built with Ruby on Rails for GR1</p>
                </div>
            </div>
            <div className="welcome--content">
                <div className="welcome--content--div1">
                    <p className="welcome--website">The features of Projekt are?</p>
                    <br />
                    <p className="welcome--text">
                        Projekt helps users manage projects, manage personnel in the team
                    </p>
                    <br />
                    <p className="welcome--text">
                        During project implementation, members can check progress through Activite's statistics. 
                        Because all activities of team members are listed and displayed by the website.
                    </p>
                    <br />
                    <p className="welcome--text">
                        In addition, each project created will be assigned a certain amount of time to complete. 
                        When completed on schedule, the team will be given priority to receive new projects. 
                        If the project is not done on schedule, the project will be stopped and transferred to another team. 
                        In addition, the team that does not complete on schedule will not be given priority to receive new projects.
                    </p>
                </div>
                <div className="welcome--content--div2">
                    <p className="welcome--text" style={{fontSize: 1.5 + "em"}}>Sign Up Today</p>
                    <br />
                    <Button variant="outlined" onClick={() => window.location.href = "/signup"}>Sign Up</Button>
                </div>
            </div>
        </div>
    );
}

export default Welcome;