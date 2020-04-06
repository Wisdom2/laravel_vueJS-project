import axios from 'axios';

export function login(credentials) {
    return new Promise((resolve, reject) => {
        axios.post('/api/auth/login', credentials)
             .then((res) => {
                 resolve(res.data);
             })
             .catch((err) => {
                reject("Wrong email or password");
             });
    })
}


export function getLocalUser() {
    const userStr = localStorage.getItem('user');

    if(! userStr) {
        return null;
    }

    return JSON.parse(userStr);
}