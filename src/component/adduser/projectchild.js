import { useEffect, useState } from "react";
import './adduser.scss';

function ProjectChild(props){

    const [project, setProject] = useState(props.project);
    const [time, setTime] = useState();
    const [st, setST] = useState("");
    const [dead, setDead] = useState();
    useEffect(() => {
        const d = new Date(project.deadline);
        var month = d.getMonth() + 1;
        setDead(d.getFullYear() + "/" + month + "/" + d.getDate());
        var diff = new Date() - d;
        setTime(diff);
        if (project.state == 2){
            setST("cp");
        }
        else if (project.state == 1){
            setST("cf");
        }
        else{
            if (diff > 0){
                setST("q");
            }
            if (diff === 0){
                setST("d");
            }
            if (diff < 0){
                setST("c");
            }
        }
    }, []);

    return (
        <div className="adduser" style={{display: "block"}} 
            onClick={() => {window.location.href = "/project/" + project.code}}>
            <p className="adduser--team">{project.name}</p><br />
            <p className="adduser--member">To be in charge of <b style={{color: "#3273dc"}}>{project.team.name}</b></p>
            {
                (st === "cp")?(
                    <p className="adduser--membername">
                        Deadline in {dead} 
                        <span className="sp sp4">Hoàn thành</span>
                    </p>
                ):null
            }
            {
                (st === "cf")?(
                    <p className="adduser--membername">
                        Deadline in {dead} 
                        <span className="sp sp5">Yêu cầu xác nhận</span>
                    </p>
                ):null
            }
            {
                (st === "q")?(
                    <p className="adduser--membername">
                        Deadline in {dead} 
                        <span className="sp sp1">Quá hạn</span>
                    </p>
                ):null
            }
            {
                (st === "d")?(
                    <p className="adduser--membername">
                        Deadline in {dead} 
                        <span className="sp sp2">Đến hạn</span>
                    </p>
                ):null
            }
            {
                (st === "c")?(
                    <p className="adduser--membername">
                        Deadline in {dead} 
                        <span className="sp sp3">Chưa đến hạn</span>
                    </p>
                ):null
            }
        </div>
    );
}

export default ProjectChild;