import axios from 'axios';

export const APP_ID_SXP = '60c35e50c2e7a08128f87a1b';

export const SXP_USER_ID = '5f476f84998b7900197c2e88';

export const SXP_CHANNEL_NAME = 'webchat';

export const startService = () =>{
    return axios.post('https://sxp-dev.techsophy.com/sxp/api/projects/60be14a1c984fd0012193c15/secured-routes/generate-dialogue-url', 
    {
        appId: '60c35e50c2e7a08128f87a1b',
        dialogue: "registration"
    }, 
    { headers: { token: localStorage.getItem('token') } });
}

export const continueService = (id, obj) => {
    return axios.post(`${id}`, obj, 
    { headers: { token: localStorage.getItem('token') } }
    );
}