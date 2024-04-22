import axios from 'axios' // npm install axios, yarn add axios

const api = axios.create({
    baseURL: 'https://api-controle-acesso-latest.onrender.com/'
})
