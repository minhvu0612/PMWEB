import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react';
import './project.scss';
import Select from 'react-select';

// import png
import { removeLocal } from '../../component/localdata/data';
import { confirm, loadAllTeam, updateProject } from '../../component/api/api';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import Box from '@mui/material/Box';
import { CircularProgress } from '@mui/material';

function ProjectSetting(props){

    const [loading, setLoading] = useState("disable");
    const [div1, setDiv1] = useState("disable");
    const [div2, setDiv2] = useState("disable");

    // team
    const [allteam, setAllTeam] = useState([]);

    //set select team
    const [selectedOption, setSelectedOption] = useState({value: props.val.teamcode, label: props.val.team.name});
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState([props.val.startline, props.val.deadline]);

    // set data
    const [pname, setPName] = useState(props.val.name);
    const [pdes, setPDes] = useState(props.val.content);

    useEffect(() => {
        if (localStorage.getItem("name") === null){
            window.location.href = "/";
        }
        async function LoadTeam(){
            await loadAllTeam().then(
                (res) => {
                    setAllTeam(res.data.data);
                    var arr = [];
                    res.data.data.map((val) => {
                        arr.push({value: val.code, label: val.name});
                    });
                    setOptions(arr);
                } 
            )
        }
        LoadTeam();
        var d1 = new Date(value[0]);
        console.log(d1.getMilliseconds());
    }, [])

    const handleUpdateProject = (e) => {
        e.preventDefault(); 
        var y = value[1].getMonth() + 1;
        var deadline = value[1].getFullYear() + "-" + y + "-" + value[1].getDate() + " " + value[1].toLocaleTimeString();
        var d1 = new Date(deadline);
        const data = {
            name: pname,
            user_id: localStorage.getItem("id"),
            description: pdes,
            teamcode: selectedOption.value,
            startline: value[0],
            deadline: value[1],
            time: d1.getTime(),
        }
        //console.log(data);
        
        async function UpdateProject(data){
            await updateProject(data).then(
                (res) => {
                    if (res.data.alert === "success"){
                        setLoading("loading");
                        setTimeout(() => window.location.href = "/home", 1000);
                    }
                    else{
                        setLoading("false");
                    }
                }
            )
        }
        UpdateProject(data);
    }

    const handleConfirmProject = (e) => {
        const data = {
            code: props.val.code,
        }
        async function CreateProject(data){
            await confirm(data).then(
                (res) => {
                    if (res.data.alert === "success"){
                        setLoading("loading");
                        setTimeout(() => window.location.href = "/home", 1000);
                    }
                    else{
                        setLoading("false");
                    }
                }
            )
        }
        CreateProject(data);
    }

    return(
        <div className="project">
            <div className="project--header">
                <p className="project--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => {
                        if (localStorage.getItem("name") === null){
                            window.location.href = "/";
                        }
                        else{
                            window.location.href = "/home";
                        }
                    }}>
                    Projekt
                </p>
                <div className="project--header--menu">
                    <div className="project--header--menu1" 
                        onMouseEnter={() => {setDiv2("disable"); setDiv1("div1")}}
                        onMouseLeave={() => setTimeout(() => setDiv1("disable"), 1000)}
                    >
                        <p className="project--text">
                            New <KeyboardArrowDownIcon />
                        </p>
                        <div className={div1}>
                            <p onClick={() => window.location.href = "/team/news"}>Project</p>
                            <p>Team</p>
                        </div>
                    </div>
                    <div className="project--header--menu2" 
                        onMouseEnter={() => {setDiv1("disable"); setDiv2("div2")}}
                        onMouseLeave={() => setTimeout(() => setDiv2("disable"), 1000)}
                    >
                        <p className="project--text">
                            Account <KeyboardArrowDownIcon />
                        </p>
                        <div className={div2}>
                            <p>{localStorage.getItem("name")}</p>
                            <p onClick={() => {removeLocal(); window.location.href = "/"}}>Log Out</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="project--main">
                <p className="project--website">Setting Project</p>
                <div className="project--main--content">
                    <p className="project--main--content--p1">Name</p>
                    <input type="text" defaultValue={pname} onChange={(e) => setPName(e.target.value)} />
                    <p className="project--main--content--p1">Description</p>
                    <textarea type="text" defaultValue={pdes} onChange={(e) => setPDes(e.target.value)}></textarea><br />
                    <p className="project--main--content--p1">Team</p>
                    <div style={{width: 15 + "%"}}>
                        <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                        />
                    </div>
                    <div style={{marginTop: 10 + "px", height: 40 + "px", width: 30 + "%"}}>
                    <p className="project--main--content--p1">Deadline</p>
                    <LocalizationProvider
                        dateAdapter={AdapterDateFns}
                        localeText={{ start: '', end: '' }}
                    >
                    <DateRangePicker
                        value={value}
                        onChange={(newValue) => {
                                    setValue(newValue);
                                }}
                        inputFormat="MM/dd/yyyy"
                        renderInput={(startProps, endProps) => (
                            <React.Fragment>
                                <TextField {...startProps} />
                                <Box sx={{ mx: 3 }}> to </Box>
                                <TextField {...endProps} />
                            </React.Fragment>
                        )}
                    />
                    </LocalizationProvider>
                    </div>
                </div>
                <button style={{marginTop: 80 + "px"}} 
                    onClick={() => window.location.href = "/home"}>Back Home</button>
                {
                    (props.val.state == 1)?(
                        <button style={{marginTop: 80 + "px", right: 60 + "px", position: "absolute"}}
                            className="btn--save" 
                            onClick={(e) => handleConfirmProject(e)}>Confirm Project</button>
                    ):null
                }
                {
                    (props.val.state == 0)?(
                        <button style={{marginTop: 80 + "px", right: 60 + "px", position: "absolute"}}
                            className="btn--save" 
                            onClick={(e) => handleUpdateProject(e)}>Change Project</button>
                    ):null
                }
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

export default ProjectSetting;