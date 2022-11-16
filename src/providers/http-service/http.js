import axios from "axios";

export const http = axios.create({
    baseURL: 'https://desafio-tech.herokuapp.com/api/',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
})