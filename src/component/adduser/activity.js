import { useEffect, useState } from 'react';
import './adduser.scss';

function ActChild(props){
    const [dead, setDead] = useState();
    useEffect(() => {
        const d = new Date(props.date);
        setDead(d);
        console.log(d);
    }, []);
    return (
        <div className="adduser act" style={{display: "block"}}>
            <p className="adduser--team">{props.state}</p><br/>
            <p className="adduser--member">By {props.user}</p>
            <p className="adduser--membername">In {props.date}</p>
        </div>
    );
}

export default ActChild;