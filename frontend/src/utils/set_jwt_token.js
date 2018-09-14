import axios from 'axios';

const setJwtToken = token => {
    if(token){
        axios.defaults.headers.common['Authorization'] = `JWT ${token}`
    }
    else{
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setJwtToken;