import axios from "axios";

export const http = axios.create({
    baseURL: 'https://desafio-tech.herokuapp.com/',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken'
})