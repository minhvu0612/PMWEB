import { useEffect, useState } from "react";
import { loadAllUit } from "../api/api";
import './adduser.scss';

function TeamChild(props){

    const [count, setCount] = useState();
    const [str, setStr] = useState("");

    useEffect(() => {
        async function LoadUit(code){
            await loadAllUit(code).then(
                (res) => {
                    var sl = 0;
                    var arrName = [];
                    res.data.data.map((val) => {
                        if (val.team.id === props.team.id){
                            sl += 1;
                            arrName.push(val.user.name);
                        }
                    });
                    setCount(sl);
                    setStr(arrName.join(", "));
                } 
            )
        }
        LoadUit(props.team.code);
        
    }, []);

    return (
        <div className="adduser" style={{display: "block"}}>
            <p className="adduser--team">{props.team.name}</p><br />
            <p className="adduser--member">{count} Members</p>
            <p className="adduser--membername">{str}</p>
        </div>
    );
}

export default TeamChild;