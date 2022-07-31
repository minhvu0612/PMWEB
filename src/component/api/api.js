import axios from "axios";
// user
export const signUp = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/signup', data);
export const logIn = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/login', data);
export const loadAUser = (id) => axios.get('http://127.0.0.1:8000/api/project/v1/get_user/' + id);
export const loadAllUser = () => axios.get('http://127.0.0.1:8000/api/project/v1/get_users');
export const updateUser = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/update_user', data);

// team
export const createTeam = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/team/add', data);
export const loadAllTeam = () => axios.get('http://127.0.0.1:8000/api/project/v1/team/get');
export const loadATeam = (id) => axios.get('http://127.0.0.1:8000/api/project/v1/team/get/' + id);
export const updateTeam = (data) => axios.put('http://127.0.0.1:8000/api/project/v1/team/update' + data);
export const deleteTeam = (id) => axios.put('http://127.0.0.1:8000/api/project/v1/team/delete/' + id);

export const addUit = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/team/adduits', data);
export const loadAllUit = (code) => axios.get('http://127.0.0.1:8000/api/project/v1/team/getuits/' + code);
export const loadAllUits = () => axios.get('http://127.0.0.1:8000/api/project/v1/team/getalluits');

// project
export const createProject = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/project/add', data);
export const loadAllProject = () => axios.get('http://127.0.0.1:8000/api/project/v1/project/get');
export const loadAProject = (id) => axios.get('http://127.0.0.1:8000/api/project/v1/project/get/' + id);
export const updateProject = (data) => axios.put('http://127.0.0.1:8000/api/project/v1/project/update', data);

// activity
export const loadAllActivity = () => axios.get('http://127.0.0.1:8000/api/project/v1/activity/get');
export const loadAllActProject = () => axios.get('http://127.0.0.1:8000/api/project/v1/pm/get');

// 
export const complete = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/project/complete', data);
export const confirm = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/project/confirm', data);