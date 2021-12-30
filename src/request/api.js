import axios from 'axios';
import Vue from 'vue'
import qs from "qs"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
let base = 'http://localhost:5000';

export const requestText=params=>{
    return axios.get(`${base}/get_text`, {params: params})
}

export const login=params=>{
    return axios.post(`${base}/login_test`, qs.stringify(params))
}
export const login_admin=params=>{
    return axios.post(`${base}/login_admin`,qs.stringify(params))
}

export const saveText=params=>{
    return axios.get(`${base}/save_text`, {params:params})
}
export const getTrainSet=params=>{
    return axios.get(`${base}/get_all_train_set`)
}

export const registerUser=params=>{
    return axios.post(`${base}/register`, qs.stringify(params))
}

export const collections=params=>{
    return axios.post(`${base}/collections`, qs.stringify(params))
}

export const getColections=params=>{
    return axios.post(`${base}/get_collections`, qs.stringify(params))
}
export const delCollections=params=>{
    return axios.post(`${base}/del_colletions`, qs.stringify(params))
}
export const saveChatHistory=params=>{
    return axios.post(`${base}/save_chat_history`, qs.stringify(params))
}
export const deleteChatHistory=params=>{
    return axios.post(`${base}/delete_chat_history`, qs.stringify(params))
}