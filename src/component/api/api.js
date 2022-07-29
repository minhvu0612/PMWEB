import axios from "axios";
// user
export const signUp = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/signup', data);
export const logIn = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/login', data);
export const loadAUser = (id) => axios.get('http://127.0.0.1:8000/api/project/v1/get_user/' + id);
export const loadAllUser = () => axios.get('http://127.0.0.1:8000/api/project/v1/get_users');

// team
export const createTeam = (data) => axios.post('http://127.0.0.1:8000/api/project/v1/team/add', data);
export const loadAllTeam = () => axios.get('http://127.0.0.1:8000/api/project/v1/team/get');
export const loadATeam = (id) => axios.get('http://127.0.0.1:8000/api/project/v1/team/get/' + id);
export const updateTeam = (data) => axios.put('http://127.0.0.1:8000/api/project/v1/team/update' + data);
export const deleteTeam = (id) => axios.put('http://127.0.0.1:8000/api/project/v1/team/delete/' + id);

export const loadAllUit = () => axios.get('http://127.0.0.1:8000/api/project/v1/team/getuits');

// project
export const createProject = (data) => axios.get('http://127.0.0.1:8000/api/project/v1/project/add', data);
export const loadAllProject = () => axios.get('http://127.0.0.1:8000/api/project/v1/project/get');
export const loadAProject = (id) => axios.get('http://127.0.0.1:8000/api/project/v1/project/get/' + id);
export const updateProject = (data) => axios.put('http://127.0.0.1:8000/api/project/v1/project/update' + data);

// activity
export const loadAllActivity = () => axios.get('http://127.0.0.1:8000/api/project/v1/activity/get');