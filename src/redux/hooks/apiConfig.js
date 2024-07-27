import axios from 'axios';
const API_URL =
    process.env.REACT_APP_DEVELOPMENT_MODE === 'development'
        ? "http://localhost:4024/api/"
        : "http://stemcity.in/api/";
console.log(API_URL,'api')
export const api =axios.create({
    baseURL : API_URL,
    headers : {
        "Content-Type":"application/json",
    }
})
export const apiWithoutHeader =axios.create({
    baseURL : API_URL
})
export const axiosPrivate = axios.create({
    baseURL: API_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});
