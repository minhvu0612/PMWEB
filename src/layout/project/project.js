import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useEffect, useState } from 'react';
import './project.scss';
import Select from 'react-select';

// import png
import { removeLocal } from '../../component/localdata/data';
import { loadAllProject } from '../../component/api/api';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers-pro';
import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
import { AdapterDateFns } from '@mui/x-date-pickers-pro/AdapterDateFns';
import Box from '@mui/material/Box';

function Project(){

    const [div1, setDiv1] = useState("disable");
    const [div2, setDiv2] = useState("disable");

    // team
    const [allteam, setAllTeam] = useState([]);

    //set select team
    const [selectedOption, setSelectedOption] = useState(null);
    const [options, setOptions] = useState([]);
    const [value, setValue] = useState([null, null]);

    useEffect(() => {
        if (localStorage.getItem("name") === null){
            window.location.href = "/";
        }
        async function LoadTeam(){
            await loadAllProject().then(
                (res) => {
                    setAllTeam(res.data.data);
                    var arr = [];
                    res.data.data.map((val) => {
                        arr.push({value: val.id, label: val.name});
                    });
                    setOptions(arr);
                } 
            )
        }
        LoadTeam();
    }, [])

    return(
        <div className="project">
            <div className="project--header">
                <p className="project--website" style={{fontSize: 1.3 + "em"}} 
                    onClick={() => window.location.href = "/"}>
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
            {
                (allteam.length === 0)?(
                    <div className="project--main">
                        <p className="project--website">New Project</p>
                        <div className="project--main--content">
                            <p className="project--main--content--p1">It look as though you are not part of a team yet!</p>
                            <p>You can create a team or get invited by another user to pin</p>
                            <button onClick={() => window.location.href = "/team/news"}>Create a team</button>
                        </div>
                        <button onClick={() => window.location.href = "/home"}>Back</button>
                    </div>
                ):null
            }
            {
                (allteam.length !== 0)?(
                    <div className="project--main">
                        <p className="project--website">New Project</p>
                        <div className="project--main--content">
                            <p className="project--main--content--p1">Name</p>
                            <input type="text" />
                            <p className="project--main--content--p1">Description</p>
                            <textarea type="text"></textarea><br />
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
                        <button style={{marginTop: 30 + "px"}} onClick={() => window.location.href = "/home"}>Back</button>
                    </div>
                ):null
            }
        </div>
    )
}

export default Project;